<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with('user')->paginate();

        return inertia('Products/Index',[
            'products' => ProductResource::collection($products),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Products/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'              =>  ['required'],
            'purchase_price'    =>  ['required', 'numeric'],
            'selling_price'     =>  ['required', 'numeric'],
            'stock'             =>  ['required', 'integer'],
            'barcode'           =>  ['nullable', 'string'],
            'img'               =>  ['nullable', 'image'],
            'description'       =>  ['nullable', 'string'],
        ]);


         /** @var $image \Illuminate\Http\UploadedFile */
        $image = $data['img'] ?? null;
        $data['user_id'] = auth()->id();

        if ($image) {
            $data['img'] = $image->store('products-images/' . Str::random(), 'public');
        }

        Product::create($data);

        // return to_route('project.index')
        //     ->with('success', 'Project was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
