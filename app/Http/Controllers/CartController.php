<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index()
    {
        $products = Product::latest()->paginate();

        return inertia('Cart/Index', ['products' => ProductResource::collection($products)]);
    }
}
