<?php

namespace App\Enum;

enum PermissionEnum: string
{
    case EditOption = 'edit option';
    case DeleteOption = 'delete option';
    case ViewOption = 'view option';
    case AddOption = 'add option';
}
