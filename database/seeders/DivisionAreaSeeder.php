<?php

namespace Database\Seeders;

use App\Models\Area;
use App\Models\District;
use App\Models\Division;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class DivisionAreaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $url = "https://member.daraz.com.bd/locationtree/api/getSubAddressList?countryCode=BD&page=addressEdit";

        $res = Http::get($url);
        $divisions = json_decode($res->body(), true);


        foreach ($divisions['module'] as $key => $division) {
            if($key == 7) {
                $divisionData['name'] = $division['name'];
                $divisionData['original_id'] = $division['id'];

                $objDivision = Division::create($divisionData);

                $dis_url = "https://member.daraz.com.bd/locationtree/api/getSubAddressList?countryCode=BD&addressId=" . $division['id'] . "&page=addressEdit";

                $district_res = Http::get($dis_url);
                $districts = json_decode($district_res->body(), true);

                foreach ($districts['module'] as $district) {
                    $districtData['name'] = $district['name'];
                    $districtData['original_id'] = $district['id'];
                    $districtData['division_id'] = $objDivision->id;

                    $objDistrict = District::create($districtData);

                    $area_url = "https://member.daraz.com.bd/locationtree/api/getSubAddressList?countryCode=BD&addressId=" . $district['id'] . "&page=addressEdit";

                    $area_res = Http::get($area_url);
                    $areas = json_decode($area_res->body(), true);

                    foreach ($areas['module'] as $area) {
                        $areaData['name'] = $area['name'];
                        $areaData['original_id'] = $area['id'];
                        $areaData['district_id'] = $objDistrict->id;

                        Area::create($areaData);
                    }
                }
            }
        }

        echo 'success';

    }
}
