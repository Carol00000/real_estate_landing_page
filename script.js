// =============================================
// NAVIGATION AND SMOOTH SCROLLING
// =============================================

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// =============================================
// SEARCH FORM HANDLING
// =============================================

function handleSearch(event) {
    event.preventDefault();
    const location = document.getElementById('location').value;
    const type = document.getElementById('type').value;
    const bedrooms = document.getElementById('bedrooms').value;
    const minPrice = document.getElementById('minprice').value;
    const maxPrice = document.getElementById('maxprice').value;
    
    const searchParams = {
        location: location,
        type: type || 'any',
        bedrooms: bedrooms || 'any',
        minPrice: minPrice || 'any',
        maxPrice: maxPrice || 'any'
    };

    console.log('Search submitted:', searchParams);
    showToast(`