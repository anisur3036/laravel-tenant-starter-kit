<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TenantController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('/tenants', TenantController::class);
    Route::resource('/permissions', PermissionController::class);
    Route::resource('/roles', RoleController::class);
    Route::resource('/users', UserController::class)->only('index', 'create', 'store', 'edit', 'update', 'destroy');
    Route::resource('/categories', CategoryController::class);
    Route::resource('/products', ProductController::class);
    Route::get('/carts', [CartController::class, 'index']);
});

require __DIR__.'/auth.php';
