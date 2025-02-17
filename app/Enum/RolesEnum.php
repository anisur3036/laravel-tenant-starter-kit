<?php

namespace App\Enum;

enum RolesEnum: string
{
    case SUPERADMIN = 'super-admin';
    case ADMIN = 'admin';
    case MANAGER = 'manager';
    case USER = 'user';
    case HRC = 'hrc';

    public static function labels(): array
    {
        return [
            self::SUPERADMIN->value => 'Super Admin',
            self::ADMIN->value => 'Admin',
            self::MANAGER->value => 'Manager',
            self::USER->value => 'User',
            self::HRC->value => 'HRC',
        ];
    }

    public function label()
    {
        return match($this) {
            self::SUPERADMIN => 'Super Admin',
            self::ADMIN => 'Admin',
            self::MANAGER => 'Admin',
            self::USER => 'User',
            self::HRC=> 'HRC',
        };
    }
}
