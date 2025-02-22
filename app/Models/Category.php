<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Str;

class Category extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory;

    protected $guarded = [];

    public const CATEGORY_IMG_PATH = 'images/uploads/category/';

    public const CATEGORY_THUMB_IMG_PATH = 'images/uploads/category_thumb/';


    public function imgOrginal(): Attribute
    {
        return Attribute::make(
            get: fn (mixed $value) => self::CATEGORY_IMG_PATH . $this->photo
        );
    }

    public function slug(): Attribute
    {
        return Attribute::make(
            set: fn ($value) => Str::slug($value)
        );
    }

    public function imgThumb(): Attribute
    {
        return Attribute::make(
            get: fn (mixed $value) => self::CATEGORY_THUMB_IMG_PATH . $this->photo
        );
    }


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

}
