<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoleResource;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index() {
        $roles = Role::with('permissions')->paginate();
        return inertia('Roles/Index', [
            'roles' => RoleResource::collection($roles)
        ]);
    }

    public function create() {
        $permissions = Permission::orderBy('name')->get();

        return inertia('Roles/Create', ['permissions' => $permissions]);
    }

    public function store(Request $request) {

        $data = $request->validate([
            'name' => 'required|min:3|unique:'.Role::class,
        ]);

        // dd($request->permissions);

        $role = Role::create($data);

        if(!empty($request->permissions)) {
            foreach($request->permissions as $name) {
                $role->givePermissionTo($name);
            }
        }

        return redirect(route('roles.index', absolute: true));
    }

    public function edit(Role $role) {
        return inertia('Roles/Edit', [
            'role' => $role,
            'permissions' => Permission::orderBy('name')->get(),
            'hasPermissions' => $role->permissions->pluck('name')
        ]);
    }

    public function update(Request $request, Role $role) {
        $data = $request->validate([
            'name' => 'required|min:3|unique:roles,name,'. $role->id
        ]);

        $role->update($data);

        if(!empty($request->permissions)) {
            $role->syncPermissions($request->permissions);
        } else {
            $role->syncPermissions([]);
        }


        return redirect(route('roles.index', absolute: true));
    }

    public function destroy(Role $role) {
        $role->delete();
    }
}
