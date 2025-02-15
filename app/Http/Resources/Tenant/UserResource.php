<?php

namespace App\Http\Resources\Tenant;

use Illuminate\Http\Request;
use App\Http\Resources\RoleResource;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'roles' => new RoleResource($this->whenLoaded('roles')),
            'created_at' => $this->created_at->format('d/m/Y'),
        ];
    }
}
