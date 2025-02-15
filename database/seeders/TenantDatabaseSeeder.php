<?php

namespace Database\Seeders;

use App\Enum\RolesEnum;
use App\Enum\PermissionEnum;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class TenantDatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //reset
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();


        $superAdminRole = Role::create(['name' => RolesEnum::SUPERADMIN->value]);
        $adminRole = Role::create(['name' => RolesEnum::ADMIN->value]);
        $hrcRole = Role::create(['name' => RolesEnum::HRC->value]);

        $addOption = Permission::create([
            'name' => PermissionEnum::AddOption->value,
        ]);

        $viewOption = Permission::create([
            'name' => PermissionEnum::ViewOption->value,
        ]);

        $editOption = Permission::create([
            'name' => PermissionEnum::EditOption->value,
        ]);

        $deleteOption = Permission::create([
            'name' => PermissionEnum::DeleteOption->value,
        ]);

        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();


        $superAdminRole->syncPermissions([
            $addOption,
            $viewOption,
            $editOption,
            $deleteOption
        ]);


        User::first()->assignRole(RolesEnum::SUPERADMIN);

        // User::factory()->create([
        //     'name' => 'User User',
        //     'email' => 'user@app.com',
        // ])->assignRole(RolesEnum::User);

        // User::factory()->create([
        //     'name' => 'Yarn User',
        //     'email' => 'yarn@app.com',
        // ])->assignRole(RolesEnum::Yarn);

        // $admin = User::factory()->create([
        //     'name' => 'Admin User',
        //     'email' => 'admin@app.com',
        // ])->assignRole(RolesEnum::Admin);

    }
}
