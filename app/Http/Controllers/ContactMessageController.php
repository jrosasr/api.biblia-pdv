<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests\StoreContactMessageRequest;
use App\Http\Resources\ContactMessageResource;
use App\Models\ContactMessage;
use App\Services\ContactMessageService;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class ContactMessageController extends Controller
{
    protected $contactMessageService;

    public function __construct(ContactMessageService $contactMessageService)
    {
        $this->contactMessageService = $contactMessageService;
    }

    /**
     * Display a listing of the resource for admins.
     */
    public function index()
    {
        $messages = $this->contactMessageService->getAllMessages();

        return Inertia::render('ContactMessages/Index', [
            'messages' => ContactMessageResource::collection($messages)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreContactMessageRequest $request)
    {
        $this->contactMessageService->storeMessage($request->validated());

        return back()->with('success', 'Tu mensaje ha sido enviado correctamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(ContactMessage $contactMessage)
    {
        return Inertia::render('ContactMessages/Show', [
            'contactMessage' => new ContactMessageResource($contactMessage)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ContactMessage $contactMessage)
    {
        $this->contactMessageService->deleteMessage($contactMessage);

        return Redirect::route('contact-messages.index')->with('success', 'Mensaje eliminado.');
    }
}
