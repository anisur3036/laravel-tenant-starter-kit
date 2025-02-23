<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
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

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(Category::class, 'parent_id')
            ->select(['id', 'parent_id', 'name']);
    }

    public function descendants(): HasMany
    {
        return $this->children()->with('descendants');
    }

    public static function tree()
    {
        $allCategories = static::get();

        $rootCategories = $allCategories->whereNull('parent_id');

        static::formatTree($rootCategories, $allCategories);

        return $rootCategories;
    }


    public static function formatTree($categories, $allCategories)
    {
        foreach ($categories as $category) {
            $category->children = $allCategories->where('parent_id', $category->id)->values();

            if($category->children->isNotEmpty()) {
                static::formatTree($category->children, $allCategories);
            }
        }
    }



}
