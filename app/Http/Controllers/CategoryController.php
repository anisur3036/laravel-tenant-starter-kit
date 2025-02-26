<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Manager\ImageUploadManager;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\CategoryParentResource;


class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::with('user')->orderBy('serial', 'asc')->paginate();

        return inertia('Categories/Index', [
            'categories' => CategoryResource::collection($categories),
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
            $parent_categoris = Category::where('parent_id', null)->get();

        return inertia('Categories/Create',[
            'parent_categoris' => CategoryParentResource::collection($parent_categoris),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'          => 'required|string',
            'slug'          => 'required|string|unique:categories,slug',
            'description'   => 'nullable|string',
            'serial'        => 'required|integer',
            'status'        => 'nullable',
            'parent_id'     => 'nullable|integer'
        ]);



        $data['user_id'] = Auth::id();
        $image = $request->file('photo');

        if($image) {
            try {
                $imageName = Str::slug($data['slug']) . '.webp';
                $categoryThumbImage = 'images/uploads/category_thumb/';
                $categoryImage = 'images/uploads/category/';

                ImageUploadManager::uploadImage($imageName, $image, 150, 150, $categoryThumbImage);
                ImageUploadManager::uploadImage($imageName, $image, 800, 800, $categoryImage);

                // ImageUploadManager::deleteImage($readPath, $imageName);

                $data['photo'] = $imageName;

            } catch(Exception $e) {
                $e->getMessage();
            }
        }

        if($data['parent_id'] === 0) {
            $data['parent_id'] = null;
        }

        Category::create($data);

        return redirect(route('categories.index', absolute: true))->with('success', 'Category has created!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        //
    }
}
