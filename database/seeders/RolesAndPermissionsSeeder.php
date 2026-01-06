<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        Permission::create(['name' => 'manage-users']);
        Permission::create(['name' => 'manage-devotionals']);
        Permission::create(['name' => 'access-dashboard']);

        // Create roles and assign created permissions

        // Admin role
        $adminRole = Role::create(['name' => 'admin']);
        $adminRole->givePermissionTo(Permission::all());

        // Writer role
        $writerRole = Role::create(['name' => 'writer']);
        $writerRole->givePermissionTo(['access-dashboard', 'manage-devotionals']);

        // User role
        $userRole = Role::create(['name' => 'user']);

        // Create a default admin user if it doesn't exist
        $admin = User::firstOrCreate(
            ['email' => 'admin@elyon.com'],
            [
                'name' => 'Admin Elyon',
                'password' => Hash::make('password'),
            ]
        );
        $admin->assignRole($adminRole);

        // Create a default writer user if it doesn't exist
        $writer = User::firstOrCreate(
            ['email' => 'writer@elyon.com'],
            [
                'name' => 'Escritor Elyon',
                'password' => Hash::make('password'),
            ]
        );
        $writer->assignRole($writerRole);
    }
}
