<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BibleHeading extends Model
{
    protected $connection = 'headings';
    protected $table = 'headings';
    public $timestamps = false;

    protected $fillable = [
        'book_id',
        'chapter',
        'verse',
        'title'
    ];
}
