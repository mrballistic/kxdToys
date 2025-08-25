import { Controller } from "@hotwired/stimulus"

// Replaces the legacy jQuery-based toy management functionality
export default class extends Controller {
  static targets = ["table", "addButton", "message", "sortButton"]

  connect() {
    // Load toys when controller connects
    if (this.hasTableTarget) {
      this.loadToys()
    }
    
    // Set up UI for edit page if we're on that page
    if (document.querySelector('.new_toy, .edit_toy')) {
      this.setupEditUI()
    }
    
    // Check for success message from URL params
    this.checkSuccessMessage()
  }
  
  // Fetch toys and build the table
  async loadToys() {
    try {
      const response = await fetch('/toys.json')
      if (!response.ok) throw new Error('Failed to load toys')
      
      this.toys = await response.json()
      this.toys.sort(this.compareNames)
      this.renderTable(this.toys)
    } catch (error) {
      console.error('Error loading toys:', error)
    }
  }
  
  // Sort handlers
  sortByName() {
    this.sortToys(this.compareNames)
  }

  sortByOwner() {
    this.sortToys(this.compareOwner)
  }

  sortByTag() {
    this.sortToys(this.compareID)
  }

  sortByUser() {
    this.sortToys(this.compareUser)
  }

  // Sorts the toys array and re-renders the table
  sortToys(compareFn) {
    if (!this.toys) return;
    this.toys.sort(compareFn);
    this.renderTable(this.toys);
  }

  // Comparison functions for sorting
  compareNames = (a, b) => {
    const aName = a.name?.toLowerCase() || '';
    const bName = b.name?.toLowerCase() || '';
    return aName < bName ? -1 : aName > bName ? 1 : 0;
  }

  compareOwner = (a, b) => {
    const aOwner = a.owner?.toLowerCase() || '';
    const bOwner = b.owner?.toLowerCase() || '';
    return aOwner < bOwner ? -1 : aOwner > bOwner ? 1 : 0;
  }

  compareID = (a, b) => {
    const aTag = a.tag?.toLowerCase() || '';
    const bTag = b.tag?.toLowerCase() || '';
    return aTag < bTag ? -1 : aTag > bTag ? 1 : 0;
  }

  compareUser = (a, b) => {
    const aUser = a.user?.toLowerCase() || '';
    const bUser = b.user?.toLowerCase() || '';
    return aUser > bUser ? -1 : aUser < bUser ? 1 : 0;
  }
  
  // Render the table with toys data
  renderTable(toys) {
    if (!this.hasTableTarget) return
    
    const tableHTML = toys.map((item, index) => {
      const isEven = index % 2 === 0
      return `
        <div id="e_${item.id}" class="eq ${isEven ? '' : 'stripe'}">
          <div class="c1">${item.name}</div>
          <div class="c2">${item.owner}</div>
          <div class="c3">${item.tag}</div>
          <div class="c4">${item.user || ''}</div>
          <div class="c5">
            <a href="/toys/${item.id}/edit" class="edit-link">
              <div class="edit"></div>
            </a>
          </div>
        </div>
      `
    }).join('')

    this.tableTarget.innerHTML = tableHTML

    // Add event listeners to edit buttons
    this.tableTarget.querySelectorAll('.edit-link').forEach(link => {
      link.addEventListener('mouseenter', () => {
        link.querySelector('.edit').style.opacity = '0.8'
      })
      link.addEventListener('mouseleave', () => {
        link.querySelector('.edit').style.opacity = '0.5'
      })
    })

    // Add hover effect to rows
    this.tableTarget.querySelectorAll('.eq').forEach(row => {
      row.addEventListener('mouseenter', () => {
        const edit = row.querySelector('.edit')
        if (edit) edit.style.opacity = '0.5'
        row.classList.add('activeStripe')
      })
      row.addEventListener('mouseleave', () => {
        const edit = row.querySelector('.edit')
        if (edit) edit.style.opacity = '0'
        row.classList.remove('activeStripe')
      })
    })
  }
  
  // Set up the UI for edit/new pages
  setupEditUI() {
    const submitButtons = document.querySelectorAll('.submitButton')
    const deleteButtons = document.querySelectorAll('.deleteButton')
    
    submitButtons.forEach(button => {
      button.classList.add('btn', 'btn-primary')
      
      // Special styling for new toy form
      if (document.querySelector('.new_toy') && 
          document.querySelector('.new_toy').contains(button)) {
        button.textContent = 'Create'
      } else {
        button.textContent = 'Update'
      }
    })
    
    deleteButtons.forEach(button => {
      button.classList.add('btn', 'btn-danger')
      button.textContent = 'Delete'
      
      // Hide delete button on new form
      if (document.querySelector('.new_toy') && 
          document.querySelector('.new_toy').contains(button)) {
        button.style.display = 'none'
      }
    })
    
    // Hook up submit button click to form submission
    submitButtons.forEach(button => {
      button.addEventListener('click', () => {
        const form = button.closest('form')
        if (form) form.submit()
      })
    })
  }
  
  // Navigate to new toy page
  addToy() {
    window.location = '/toys/new'
  }
  
  // Check URL for success parameter and show message
  checkSuccessMessage() {
    const urlParams = new URLSearchParams(window.location.search)
    const success = urlParams.get('success')
    
    if (success === 'true' && this.hasMessageTarget) {
      this.messageTarget.classList.remove('hidden')
      
      // Auto-hide message after 2 seconds
      setTimeout(() => {
        this.messageTarget.classList.add('hidden')
      }, 2000)
    }
  }
}