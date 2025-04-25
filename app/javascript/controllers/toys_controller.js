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
      
      let toys = await response.json()
      toys.sort(this.compareNames)
      this.renderTable(toys)
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
  
  async sortToys(compareFn) {
    try {
      const response = await fetch('/toys.json')
      if (!response.ok) throw new Error('Failed to load toys')
      
      let toys = await response.json()
      toys.sort(compareFn)
      this.renderTable(toys)
    } catch (error) {
      console.error('Error sorting toys:', error)
    }
  }
  
  // Comparison functions for sorting
  compareNames = (a, b) => {
    const nameA = a.toy?.name?.toLowerCase() || ''
    const nameB = b.toy?.name?.toLowerCase() || ''
    return nameA < nameB ? -1 : nameA > nameB ? 1 : 0
  }
  
  compareOwner = (a, b) => {
    const nameA = a.toy?.owner?.toLowerCase() || ''
    const nameB = b.toy?.owner?.toLowerCase() || ''
    return nameA < nameB ? -1 : nameA > nameB ? 1 : 0
  }
  
  compareID = (a, b) => {
    const nameA = a.toy?.tag?.toLowerCase() || ''
    const nameB = b.toy?.tag?.toLowerCase() || ''
    return nameA < nameB ? -1 : nameA > nameB ? 1 : 0
  }
  
  compareUser = (a, b) => {
    const nameA = a.toy?.user?.toLowerCase() || ''
    const nameB = b.toy?.user?.toLowerCase() || ''
    return nameA > nameB ? -1 : nameA < nameB ? 1 : 0
  }
  
  // Render the table with toys data
  renderTable(toys) {
    if (!this.hasTableTarget) return
    
    const tableHTML = toys.map((item, index) => {
      const toy = item.toy
      const isEven = index % 2 === 0
      
      return `
        <ul id="e_${toy.id}" class="eq ${isEven ? '' : 'stripe'}">
          <li class="c1">${toy.name}</li>
          <li class="c2">${toy.owner}</li>
          <li class="c3">${toy.tag}</li>
          <li class="c4">${toy.user || ''}</li>
          <li class="c5">
            <a href="/toys/${toy.id}/edit" class="edit-link">
              <div class="edit"></div>
            </a>
          </li>
        </ul>
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
        row.querySelector('.edit').style.opacity = '0.5'
        row.classList.add('activeStripe')
      })
      
      row.addEventListener('mouseleave', () => {
        row.querySelector('.edit').style.opacity = '0'
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