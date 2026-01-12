<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreBibleHeadingRequest;
use App\Http\Requests\Admin\UpdateBibleHeadingRequest;
use App\Http\Resources\Admin\BibleHeadingResource;
use App\Models\BibleHeading;
use App\Services\BibleHeadingService;
use App\Services\BibleReaderService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BibleHeadingController extends Controller
{
    protected $headingService;
    protected $bibleService;

    public function __construct(BibleHeadingService $headingService, BibleReaderService $bibleService)
    {
        $this->headingService = $headingService;
        $this->bibleService = $bibleService;
    }

    public function index(Request $request)
    {
        $headings = $this->headingService->paginateHeadings($request->only(['book_id']));

        return Inertia::render('Admin/BibleHeadings/Index', [
            'headings' => BibleHeadingResource::collection($headings),
            'books' => $this->bibleService->getBooks('RV1960'),
            'filters' => $request->only(['book_id'])
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/BibleHeadings/Create', [
            'books' => $this->bibleService->getBooks('RV1960'),
        ]);
    }

    public function store(StoreBibleHeadingRequest $request)
    {
        $this->headingService->createMultiple(
            $request->book_id,
            $request->headings
        );

        return redirect()->route('bible-headings.index', ['book_id' => $request->book_id])
            ->with('success', 'Títulos creados correctamente.');
    }

    public function edit($id)
    {
        $heading = BibleHeading::findOrFail($id);

        return Inertia::render('Admin/BibleHeadings/Edit', [
            'heading' => new BibleHeadingResource($heading),
            'books' => $this->bibleService->getBooks('RV1960'),
        ]);
    }

    public function update(UpdateBibleHeadingRequest $request, $id)
    {
        $this->headingService->update($id, $request->validated());

        return redirect()->route('bible-headings.index', ['book_id' => $request->book_id])
            ->with('success', 'Título actualizado correctamente.');
    }

    public function destroy($id)
    {
        $this->headingService->delete($id);

        return redirect()->back()->with('success', 'Título eliminado correctamente.');
    }
}
