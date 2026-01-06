<?php

namespace App\Services;

use App\Models\ContactMessage;
use Illuminate\Database\Eloquent\Collection;

class ContactMessageService
{
    /**
     * Get all contact messages.
     */
    public function getAllMessages(): Collection
    {
        return ContactMessage::latest()->get();
    }

    public function storeMessage(array $data): ContactMessage
    {
        $user = auth()->user();
        $data['name'] = $user->name;
        $data['email'] = $user->email;
        return ContactMessage::create($data);
    }

    /**
     * Delete a contact message.
     */
    public function deleteMessage(ContactMessage $contactMessage): bool
    {
        return $contactMessage->delete();
    }
}
