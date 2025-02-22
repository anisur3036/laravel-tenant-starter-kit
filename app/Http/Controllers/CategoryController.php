<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Manager\ImageUploadManager;
use App\Models\Category;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;


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
        return inertia('Categories/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'slug' => 'required|string|unique:categories,slug',
            'description' => 'nullable|string',
            'serial' => 'required|integer',
            'status' => 'nullable',
        ]);



        $data['user_id'] = Auth::id();
        $image = $request->file('photo');

        try {

            if($image) {
                $imageName = Str::slug($data['slug']) . '.webp';
                $image->move('images/uploads', $imageName);

                $readPath = 'images/uploads/';
                $categoryThumbImage = 'images/uploads/category_thumb/';
                $categoryImage = 'images/uploads/category/';

                ImageUploadManager::uploadImage($imageName, $readPath, 150, 150, $categoryThumbImage);
                ImageUploadManager::uploadImage($imageName, $readPath, 800, 800, $categoryImage);

                ImageUploadManager::deleteImage($readPath, $imageName);

                $data['photo'] = $imageName;
            }
        } catch(Exception $e) {
            $e->getMessage();
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
