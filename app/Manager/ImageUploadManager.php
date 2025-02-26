<?php

namespace App\Manager;

use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ImageUploadManager
{

    public static function uploadImage(string $name, string $readImage, int $width, int $height, string $outputPath)
    {
        $manager = new ImageManager(new Driver());

        $image = $manager->read($readImage);
        $image->resize($width, $height);
        $image->save($outputPath . $name);
    }


    public static function deleteImage($path, $img): void
    {
        $path = public_path($path).$img;

        if($img != '' && file_exists($path)) {
            unlink($path);
        }
    }
}
