document.addEventListener('DOMContentLoaded', function() {
    const listContainer = document.getElementById('listContainer');
    let draggedItem = null;
    
    // Add event listeners for each list item
    document.querySelectorAll('.list-item').forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('dragenter', handleDragEnter);
        item.addEventListener('dragleave', handleDragLeave);
        item.addEventListener('drop', handleDrop);
    });
    
    function handleDragStart(e) {
        draggedItem = this;
        this.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
    }
    
    function handleDragEnd() {
        this.classList.remove('dragging');
        // Remove over class from all items when drag ends
        document.querySelectorAll('.list-item').forEach(item => {
            item.classList.remove('over');
        });
    }
    
    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        return false;
    }
    
    function handleDragEnter(e) {
        e.preventDefault();
        // Don't highlight the item we're dragging
        if (this !== draggedItem) {
            this.classList.add('over');
        }
    }
    
    function handleDragLeave() {
        this.classList.remove('over');
    }
    
    function handleDrop(e) {
        e.stopPropagation(); // stops the browser from redirecting
        e.preventDefault();
        
        // Don't do anything if we're dropping on the same item we're dragging
        if (this !== draggedItem) {
            // Remove highlight
            this.classList.remove('over');
            
            // Get all items as array for easier manipulation
            const items = Array.from(listContainer.querySelectorAll('.list-item'));
            
            // Find indexes of dragged item and drop target
            const draggedIndex = items.indexOf(draggedItem);
            const targetIndex = items.indexOf(this);
            
            // Determine if we're moving up or down in the list
            if (draggedIndex < targetIndex) {
                // Move down - insert after the target
                this.after(draggedItem);
            } else {
                // Move up - insert before the target
                this.before(draggedItem);
            }
        }
        
        return false;
    }
});
