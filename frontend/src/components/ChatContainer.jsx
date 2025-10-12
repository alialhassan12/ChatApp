import React from 'react'
import { useChatStore } from '../store/useChatStore'

function ChatContainer() {
    const {selectedUser}=useChatStore();
    return (
        <div>
            {selectedUser.fullName}
        </div>
    )
}

export default ChatContainer
