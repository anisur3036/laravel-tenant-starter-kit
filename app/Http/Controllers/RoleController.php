<?php

namespace App\Http\Controllers;

use App\Enum\RolesEnum;
use App\Http\Resources\RoleResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
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
        $roles = RolesEnum::cases();

        return inertia('Roles/Create', ['permissions' => $permissions, 'roles' => $roles]);
    }

    public function store(Request $request) {

        $data = $request->validate([
            'name' => [Rule::enum(RolesEnum::class), 'required', 'min:3', 'unique:' . Role::class],
        ]);

        DB::transaction(function() use ($data, $request) {

            $role = Role::create($data);

            if(!empty($request->permissions)) {
                foreach($request->permissions as $name) {
                    $role->givePermissionTo($name);
                }
            }

            return $role;
        });

        return redirect(route('roles.index', absolute: true))->with('success', 'Role has created!');
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

        $role = DB::transaction(function() use ($role, $data, $request) {

            $role->update($data);

            if(!empty($request->permissions)) {
                $role->syncPermissions($request->permissions);
            } else {
                $role->syncPermissions([]);
            }

            return $role;
        });

        return redirect(route('roles.index', absolute: true))->with('success', 'Role successfully updated!');
    }

    public function destroy(Role $role) {
        $role->delete();
    }
}
