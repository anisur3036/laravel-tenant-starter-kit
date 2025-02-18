<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ProductResource extends JsonResource
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
            'img' => $this->img ? Storage::url($this->img) : '',
            'name' => $this->name,
            'purchase_price' => $this->purchase_price,
            'selling_price' => $this->selling_price,
            'stock' => $this->stock,
            'barcode' => $this->barcode,
            'description' => $this->description,
            'user' => new UserResource($this->user),
            'created_at' => $this->created_at->format('d/m/Y'),
        ];
    }
}
