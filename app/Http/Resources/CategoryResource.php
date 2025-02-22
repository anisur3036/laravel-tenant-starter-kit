<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
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
            'slug' => $this->slug,
            'thumb_image' => !empty($this->photo) ? url($this->img_thumb) : url('images/placeholder.webp'),
            'description' => $this->description,
            'user' => new UserResource($this->user),
            'created_at' => $this->created_at->format('d/m/Y'),
        ];
    }
}
