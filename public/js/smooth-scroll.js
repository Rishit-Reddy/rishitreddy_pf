// Smooth scrolling utility
document.addEventListener('DOMContentLoaded', () => {
  // Get all navigation links that have hash (#) in their href
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  // Add click event listener to each link
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Prevent default anchor click behavior
      e.preventDefault();
      
      // Get the target section id from the href
      const targetId = this.getAttribute('href');
      
      // If it's just '#', scroll to top
      if (targetId === '#') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return;
      }
      
      // Find the target element
      const targetElement = document.querySelector(targetId);
      
      // If target exists, scroll to it
      if (targetElement) {
        // Get sticky navigation height if it exists
        const stickyNav = document.querySelector('.fixed.top-0');
        const navHeight = stickyNav ? stickyNav.offsetHeight : 0;
        
        // Calculate position, subtracting height for the sticky nav
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
        
        // Scroll to target
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update URL hash without causing another scroll
        window.history.pushState(null, null, targetId);
      }
    });
  });
});
