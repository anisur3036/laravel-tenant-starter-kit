<?php

namespace App\Http\Controllers;

use App\Http\Resources\PermissionResource;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    public function index() {
        $permissions = Permission::paginate();
        return inertia('Permissions/Index', [
            'permissions' => PermissionResource::collection($permissions)
        ]);
    }

    public function create() {
        return inertia('Permissions/Create');
    }

    public function store(Request $request) {
        $data = $request->validate([
            'name' => 'required|min:3|unique:'.Permission::class,
        ]);

        Permission::create($data);

        // return redirect(route('permissions.index', absolute: true));


    }

    public function edit(Permission $permission) {
        return inertia('Permissions/Edit', [
            'permission' => $permission
        ]);
    }

    public function update(Request $request, Permission $permission) {
        $data = $request->validate([
            'name' => 'required|min:3|unique:permissions,name,'. $permission->id
        ]);

        $permission->update($data);

        return redirect(route('permissions.index', absolute: true));

    }

    public function destroy(Permission $permission) {
        $permission->delete();
    }
}
