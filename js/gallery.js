// Gallery and Modal Functionality

// Modal Management
function openImageModal(imgElement) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('imageModal');
    if (!modal) {
        createImageModal();
        modal = document.getElementById('imageModal');
    }
    
    // Set modal image source and alt text
    const modalImg = modal.querySelector('#modalImage');
    const modalTitle = modal.querySelector('.modal-title');
    
    modalImg.src = imgElement.src;
    modalImg.alt = imgElement.alt;
    modalTitle.textContent = imgElement.alt;
    
    // Show the modal
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
}

function createImageModal() {
    const modalHTML = `
        <div class="modal fade" id="imageModal" tabindex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="imageModalLabel">Image View</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-center">
                        <img id="modalImage" class="img-fluid" alt="Enlarged view">
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Carousel Navigation
function goToSlide(carouselId, slideIndex) {
    const carousel = document.getElementById(carouselId);
    const bootstrapCarousel = bootstrap.Carousel.getOrCreateInstance(carousel);
    bootstrapCarousel.to(slideIndex);
    
    // Update thumbnail active state
    updateThumbnailActiveState(carouselId, slideIndex);
}

function updateThumbnailActiveState(carouselId, activeIndex) {
    const carouselElement = document.getElementById(carouselId);
    const thumbnailContainer = carouselElement.closest('.project-gallery').querySelector('.thumbnail-gallery');
    
    if (thumbnailContainer) {
        const thumbnails = thumbnailContainer.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === activeIndex);
        });
    }
}

// Gallery Counter Updates
function updateGalleryCounter(carouselId, currentSlide) {
    let counterId;
    switch(carouselId) {
        case 'foliolabCarousel':
            counterId = 'foliolab-current';
            break;
        case 'realestateCarousel':
            counterId = 'realestate-current';
            break;
        case 'ecommerceCarousel':
            counterId = 'ecommerce-current';
            break;
        case 'additionalCarousel':
            counterId = 'additional-current';
            break;
    }
    
    if (counterId) {
        const counter = document.getElementById(counterId);
        if (counter) {
            counter.textContent = currentSlide + 1;
        }
    }
}

// Interactive Dashboard Modal
function openInteractiveDashboard() {
    // Create dashboard modal if it doesn't exist
    let modal = document.getElementById('dashboardModal');
    if (!modal) {
        createDashboardModal();
        modal = document.getElementById('dashboardModal');
    }
    
    // Show the modal
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
    
    // Add resize handler for dashboard
    window.addEventListener('resize', resizeDashboard);
    
    // Start the dashboard loading process
    setTimeout(() => {
        handleDashboardLoad();
    }, 500); // Give modal time to open
    
    // Backup timer to hide loading if it gets stuck
    setTimeout(() => {
        const loading = document.getElementById('dashboard-loading');
        if (loading && loading.style.display !== 'none') {
            console.log('Backup timer: forcing loading to hide');
            hideLoadingShowDashboard('realEstateDashboard');
        }
    }, 5000); // Force hide after 5 seconds
}

function resizeDashboard() {
    const vizElement = document.querySelector('#viz1761202959760 object');
    if (vizElement) {
        vizElement.style.width = '100%';
        // Keep a reasonable fixed height that works
        vizElement.style.height = '850px';
    }
}

function createDashboardModal() {
    const modalHTML = `
        <div class="modal fade" id="dashboardModal" tabindex="-1" aria-labelledby="dashboardModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content">
                    <!-- Minimal close button with red cross -->
                    <button type="button" class="btn-close position-absolute" 
                            data-bs-dismiss="modal" aria-label="Close" 
                            style="top: 15px; left: 15px; z-index: 9999; background: rgba(0,0,0,0.6); border-radius: 50%; padding: 10px; width: 40px; height: 40px; border: none; display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-times" style="color: #ff4444; font-size: 16px;"></i>
                    </button>
                    <div class="modal-body p-0">
                        <div class="dashboard-container">
                            <div id="dashboard-loading" class="d-flex align-items-center justify-content-center" style="height: 80vh;" onclick="forceHideLoading()">
                                <div class="text-center">
                                    <div class="spinner-border text-primary mb-3" style="width: 3rem; height: 3rem;" role="status">
                                        <span class="visually-hidden">Loading dashboard...</span>
                                    </div>
                                    <h5 class="text-muted">Initializing Interactive Dashboard...</h5>
                                    <p class="text-muted">Connecting to data visualization...</p>
                                    <button class="btn btn-sm btn-outline-primary mt-2" onclick="forceHideLoading()">
                                        <i class="fas fa-eye me-1"></i>Show Dashboard
                                    </button>
                                </div>
                            </div>
                            
                            <!-- Your Real Estate Dashboard -->
                            <div id="realEstateDashboard" style="width: 100%; height: 100vh; display: none; padding: 0; overflow: hidden;">
                                <div class='tableauPlaceholder' id='viz1761202959760' style='position: relative; width: 100%; height: 100%;'>
                                    <noscript>
                                        <a href='#'>
                                            <img alt='US Real Estate Investment Analysis' 
                                                 src='https://public.tableau.com/static/images/US/USRealEstateInvestmentAnalysis/Dashboard2/1_rss.png' 
                                                 style='border: none' />
                                        </a>
                                    </noscript>
                                    <object class='tableauViz' style='display:none;'>
                                        <param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> 
                                        <param name='embed_code_version' value='3' /> 
                                        <param name='site_root' value='' />
                                        <param name='name' value='USRealEstateInvestmentAnalysis&#47;Dashboard2' />
                                        <param name='tabs' value='no' />
                                        <param name='toolbar' value='yes' />
                                        <param name='static_image' value='https://public.tableau.com/static/images/US/USRealEstateInvestmentAnalysis/Dashboard2/1.png' /> 
                                        <param name='animate_transition' value='yes' />
                                        <param name='display_static_image' value='yes' />
                                        <param name='display_spinner' value='yes' />
                                        <param name='display_overlay' value='yes' />
                                        <param name='display_count' value='yes' />
                                        <param name='language' value='en-US' />
                                    </object>
                                </div>
                            </div>
                            
                            <!-- Fallback iframe for alternative embedding -->
                            <iframe 
                                id="dashboard-iframe"
                                src="https://public.tableau.com/views/USRealEstateInvestmentAnalysis/Dashboard2?:embed=yes&:display_count=yes&:showVizHome=no&:toolbar=yes"
                                width="100%" 
                                height="850px" 
                                style="border:none; display:none;"
                                title="US Real Estate Investment Analysis Dashboard"
                                frameborder="0"
                                allowfullscreen>
                            </iframe>
                            

                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Dashboard Event Handlers with Multiple Strategies
function handleDashboardLoad() {
    // Try to load your specific Real Estate dashboard first
    tryTableauJSAPI()
        .then(() => {
            console.log('Your Real Estate Dashboard loaded successfully');
            hideLoadingShowDashboard('realEstateDashboard');
        })
        .catch((error) => {
            console.log('Real Estate Dashboard failed, trying iframe approach:', error);
            tryIframeEmbed()
                .then(() => {
                    hideLoadingShowDashboard('dashboard-iframe');
                })
                .catch(() => {
                    console.log('All embedding methods failed, showing simple error');
                    showFallbackDashboard();
                });
        });
}

function tryTableauJSAPI() {
    return new Promise((resolve, reject) => {
        // Try to initialize your specific Real Estate dashboard
        try {
            const divElement = document.getElementById('viz1761202959760');
            if (divElement) {
                const vizElement = divElement.getElementsByTagName('object')[0];
                
                // Set up full-screen sizing (no header now)
                const modalWidth = window.innerWidth;
                const modalHeight = window.innerHeight;
                
                vizElement.style.width = '100%';
                vizElement.style.minWidth = modalWidth + 'px';
                vizElement.style.maxWidth = modalWidth + 'px';
                vizElement.style.height = modalHeight + 'px';
                vizElement.style.minHeight = modalHeight + 'px';
                
                // Load the Tableau JavaScript API
                const scriptElement = document.createElement('script');
                scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
                
                // Hide loading immediately when script starts loading
                setTimeout(() => {
                    hideLoadingShowDashboard('realEstateDashboard');
                }, 1000);
                
                scriptElement.onload = () => {
                    // Ensure loading is hidden when script loads
                    setTimeout(() => {
                        hideLoadingShowDashboard('realEstateDashboard');
                        resolve();
                    }, 500);
                };
                
                scriptElement.onerror = () => reject('Script load failed');
                vizElement.parentNode.insertBefore(scriptElement, vizElement);
                
                // Force resolve after reasonable time
                setTimeout(() => {
                    hideLoadingShowDashboard('realEstateDashboard');
                    resolve();
                }, 3000);
            } else {
                reject('Dashboard container not found');
            }
        } catch (error) {
            reject(error);
        }
    });
}

function tryIframeEmbed() {
    return new Promise((resolve, reject) => {
        const iframe = document.getElementById('dashboard-iframe');
        
        // Try your Real Estate dashboard and fallback options
        const workingUrls = [
            'https://public.tableau.com/views/USRealEstateInvestmentAnalysis/Dashboard2?:embed=yes&:display_count=yes&:showVizHome=no&:toolbar=yes',
            'https://public.tableau.com/views/RegionalSampleWorkbook/Storms?:embed=yes&:display_count=yes&:showVizHome=no',
            'https://public.tableau.com/views/WorldIndicators/GDPpercapita?:embed=yes&:display_count=yes&:showVizHome=no'
        ];
        
        let urlIndex = 0;
        
        function tryNextUrl() {
            if (urlIndex >= workingUrls.length) {
                reject('All iframe URLs failed');
                return;
            }
            
            iframe.src = workingUrls[urlIndex];
            
            const timeout = setTimeout(() => {
                urlIndex++;
                tryNextUrl();
            }, 5000); // Wait 5 seconds before trying next URL
            
            iframe.onload = function() {
                clearTimeout(timeout);
                // Check if the iframe loaded successfully
                try {
                    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                    if (iframeDoc.body && iframeDoc.body.innerHTML.length > 0) {
                        resolve();
                    } else {
                        urlIndex++;
                        tryNextUrl();
                    }
                } catch (e) {
                    // Cross-origin restrictions, assume it worked if no error
                    resolve();
                }
            };
            
            iframe.onerror = function() {
                clearTimeout(timeout);
                urlIndex++;
                tryNextUrl();
            };
        }
        
        tryNextUrl();
    });
}

function hideLoadingShowDashboard(elementId) {
    const loading = document.getElementById('dashboard-loading');
    const element = document.getElementById(elementId);
    
    // Force hide loading with multiple methods
    if (loading) {
        loading.style.display = 'none !important';
        loading.style.visibility = 'hidden';
        loading.classList.add('d-none');
        loading.remove(); // Completely remove loading element
    }
    
    if (element) {
        element.style.display = 'block';
        element.style.visibility = 'visible';
        element.style.position = 'absolute';
        element.style.top = '0';
        element.style.left = '0';
        element.style.width = '100%';
        element.style.height = '100%';
        element.classList.remove('d-none');
    }
    
    // If showing the real estate dashboard, make sure the Tableau container is visible
    if (elementId === 'realEstateDashboard') {
        const tableauContainer = document.getElementById('viz1761202959760');
        if (tableauContainer) {
            tableauContainer.style.display = 'block';
            tableauContainer.style.visibility = 'visible';
            // Also show the object element
            const objectElement = tableauContainer.getElementsByTagName('object')[0];
            if (objectElement) {
                objectElement.style.display = 'block';
                objectElement.style.visibility = 'visible';
            }
        }
    }
    
    console.log('Loading hidden, dashboard shown:', elementId);
}

function showFallbackDashboard() {
    const loading = document.getElementById('dashboard-loading');
    
    if (loading) {
        loading.innerHTML = `
            <div class="text-center">
                <i class="fas fa-exclamation-triangle fa-3x text-warning mb-3"></i>
                <h5 class="text-muted">Dashboard Temporarily Unavailable</h5>
                <p class="text-muted mb-3">Please try refreshing the page or come back later.</p>
                <button type="button" class="btn btn-primary me-2" onclick="tryAlternateDashboard()">
                    <i class="fas fa-redo me-2"></i>Try Again
                </button>
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                    <i class="fas fa-times me-2"></i>Close
                </button>
            </div>
        `;
    }
}

function tryAlternateDashboard() {
    // Reset and try again with your Real Estate dashboard
    const loading = document.getElementById('dashboard-loading');
    const iframe = document.getElementById('dashboard-iframe');
    
    // Show loading again
    loading.style.display = 'flex';
    loading.innerHTML = `
        <div class="text-center">
            <div class="spinner-border text-primary mb-3" style="width: 3rem; height: 3rem;" role="status">
                <span class="visually-hidden">Loading dashboard...</span>
            </div>
            <h5 class="text-muted">Retrying Dashboard Connection...</h5>
            <p class="text-muted">Loading your Real Estate Analytics...</p>
        </div>
    `;
    
    // Try your Real Estate dashboard in iframe mode
    iframe.src = 'https://public.tableau.com/views/USRealEstateInvestmentAnalysis/Dashboard2?:embed=yes&:display_count=yes&:showVizHome=no&:toolbar=yes';
    
    setTimeout(() => {
        hideLoadingShowDashboard('dashboard-iframe');
    }, 3000);
}

function handleDashboardError() {
    console.log('Dashboard load error, showing fallback immediately');
    showFallbackDashboard();
}

function forceHideLoading() {
    console.log('Force hiding loading screen');
    hideLoadingShowDashboard('realEstateDashboard');
    
    // Also try to show the iframe version as backup
    const iframe = document.getElementById('dashboard-iframe');
    if (iframe) {
        iframe.style.display = 'block';
        iframe.style.visibility = 'visible';
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize carousel event listeners for all carousels
    const carousels = ['foliolabCarousel', 'realestateCarousel', 'ecommerceCarousel', 'additionalCarousel'];
    
    carousels.forEach(carouselId => {
        const carouselElement = document.getElementById(carouselId);
        if (carouselElement) {
            carouselElement.addEventListener('slide.bs.carousel', function(event) {
                updateGalleryCounter(carouselId, event.to);
                updateThumbnailActiveState(carouselId, event.to);
            });
        }
    });
    
    // Initialize smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Keyboard Navigation for Modals
document.addEventListener('keydown', function(event) {
    const imageModal = document.getElementById('imageModal');
    const dashboardModal = document.getElementById('dashboardModal');
    
    // Close modals with Escape key
    if (event.key === 'Escape') {
        if (imageModal && imageModal.classList.contains('show')) {
            bootstrap.Modal.getInstance(imageModal).hide();
        }
        if (dashboardModal && dashboardModal.classList.contains('show')) {
            bootstrap.Modal.getInstance(dashboardModal).hide();
        }
    }
});

// Future enhancements can be added here

// Loading States
function showLoadingState(element) {
    element.style.opacity = '0.6';
    element.style.pointerEvents = 'none';
}

function hideLoadingState(element) {
    element.style.opacity = '1';
    element.style.pointerEvents = 'auto';
}

// Error Handling for Images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            const placeholder = document.createElement('div');
            placeholder.className = 'image-placeholder d-flex align-items-center justify-content-center';
            placeholder.innerHTML = '<i class="fas fa-image fa-3x text-muted"></i>';
            placeholder.style.cssText = 'height: 200px; background-color: #f8f9fa; border: 1px dashed #dee2e6; border-radius: 0.5rem;';
            this.parentNode.insertBefore(placeholder, this.nextSibling);
        });
    });
});