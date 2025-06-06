// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Active navigation link based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Typewriter effect
document.addEventListener('DOMContentLoaded', function() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;
    
    const words = ['innovation', 'algorithms', 'machine learning', 'deep learning', 'neural networks'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 1000; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before starting new word
        }
        
        setTimeout(type, typeSpeed);
    }
    
    setTimeout(type, 1000);
});

// Initialize particles.js
document.addEventListener('DOMContentLoaded', function() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#ffffff'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: true
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
});

// Neural network visualization
document.addEventListener('DOMContentLoaded', function() {
    const neuralNetworkContainer = document.getElementById('neural-network');
    if (!neuralNetworkContainer || typeof THREE === 'undefined') return;
    
    let scene, camera, renderer;
    let particles, geometry, material;
    let mouseX = 0, mouseY = 0;
    
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    
    function init() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.z = 1000;
        
        geometry = new THREE.BufferGeometry();
        const vertices = [];
        const sizes = [];
        
        for (let i = 0; i < 1000; i++) {
            const x = Math.random() * 2000 - 1000;
            const y = Math.random() * 2000 - 1000;
            const z = Math.random() * 2000 - 1000;
            
            vertices.push(x, y, z);
            sizes.push(10);
        }
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
        
        material = new THREE.PointsMaterial({
            color: 0x4e74f1,
            size: 5,
            transparent: true,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });
        
        particles = new THREE.Points(geometry, material);
        scene.add(particles);
        
        renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        neuralNetworkContainer.appendChild(renderer.domElement);
        
        document.addEventListener('mousemove', onDocumentMouseMove);
        window.addEventListener('resize', onWindowResize);
    }
    
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    function onDocumentMouseMove(event) {
        mouseX = (event.clientX - windowHalfX) * 0.05;
        mouseY = (event.clientY - windowHalfY) * 0.05;
    }
    
    function animate() {
        requestAnimationFrame(animate);
        render();
    }
    
    function render() {
        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
        
        const positions = geometry.attributes.position.array;
        
        for (let i = 0; i < positions.length; i += 3) {
            const ix = i / 3;
            const theta = 0.001 * Date.now() + ix * 0.01;
            positions[i + 1] += Math.sin(theta) * 0.5;
        }
        
        geometry.attributes.position.needsUpdate = true;
        renderer.render(scene, camera);
    }
    
    init();
    animate();
});

// Skills progress bars animation
document.addEventListener('DOMContentLoaded', function() {
    const progressBars = document.querySelectorAll('.progress');
    
    function animateProgressBars() {
        progressBars.forEach(bar => {
            const percent = bar.getAttribute('data-percent');
            bar.style.width = percent + '%';
        });
    }
    
    // Animate on scroll
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        window.addEventListener('scroll', function() {
            const sectionPos = skillsSection.getBoundingClientRect().top;
            const screenPos = window.innerHeight / 1.3;
            
            if (sectionPos < screenPos) {
                animateProgressBars();
            }
        });
    }
});

// Projects Section Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Project data
    const projects = {
        'gan': {
            title: 'GAN-Based Anomaly Detection',
            tags: ['TensorFlow', 'GANs', 'Cybersecurity'],
            description: `
                <p>A novel approach to autonomous vehicle security using generative adversarial networks.</p>
                <h4>The Challenge</h4>
                <p>Autonomous vehicle security depends on detecting malicious intrusions in Controller Area Network (CAN) communications, but real attack data is scarce and difficult to collect.</p>
                <h4>The Solution</h4>
                <p>I designed a generative adversarial network that creates synthetic CAN bus attack data while maintaining the statistical properties of genuine attacks. This innovation allowed for more robust anomaly detection models by training on diverse attack scenarios.</p>
                <h4>Key Features</h4>
                <ul>
                    <li>Custom GAN architecture with CNN-based discriminator</li>
                    <li>Optimized adversarial training with 0.68 discriminator loss</li>
                    <li>Batch normalization for 25% improved training stability</li>
                    <li>Statistical validation of synthetic data quality</li>
                </ul>
            `
        },
        'cnn-lstm': {
            title: 'CNN-LSTM Intrusion Detection',
            tags: ['Keras', 'Deep Learning', 'Network Security'],
            description: `
                <p>Hybrid deep learning architecture for enhanced network security monitoring.</p>
                <h4>The Challenge</h4>
                <p>Network intrusion detection systems struggle with balancing false positives and missed detections while maintaining real-time performance.</p>
                <h4>The Solution</h4>
                <p>I engineered a hybrid deep learning architecture combining CNN for spatial feature extraction with LSTM for temporal pattern recognition in network traffic.</p>
                <h4>Key Features</h4>
                <ul>
                    <li>Preprocessed network traffic data into meaningful sequences</li>
                    <li>Multi-layered CNN architecture for feature extraction</li>
                    <li>LSTM layers for sequential pattern analysis</li>
                    <li>Optimized for real-time performance</li>
                </ul>
            `
        },
        'sign-language': {
            title: 'Sign Language Detection',
            tags: ['OpenCV', 'CNN', 'Accessibility'],
            description: `
                <p>Real-time recognition system for improved accessibility using computer vision.</p>
                <h4>The Challenge</h4>
                <p>Communication barriers exist for people with hearing impairments, requiring accessible and real-time translation solutions.</p>
                <h4>The Solution</h4>
                <p>I built a real-time sign language recognition model using OpenCV and CNN to translate hand gestures into text, improving accessibility for the hearing-impaired.</p>
                <h4>Key Features</h4>
                <ul>
                    <li>Hand tracking and segmentation using OpenCV</li>
                    <li>Custom CNN architecture for gesture classification</li>
                    <li>Image preprocessing for enhanced detection accuracy</li>
                    <li>User-friendly interface with real-time feedback</li>
                </ul>
            `
        },
        'drowsiness': {
            title: 'Driver Drowsiness Detection',
            tags: ['OpenCV', 'Facial Recognition', 'Safety'],
            description: `
                <p>Computer vision solution for improving road safety with real-time monitoring.</p>
                <h4>The Challenge</h4>
                <p>Driver fatigue is a major cause of road accidents, necessitating real-time monitoring systems to prevent drowsiness-related incidents.</p>
                <h4>The Solution</h4>
                <p>I developed a real-time driver monitoring system using OpenCV and CNN to detect drowsiness through facial landmark analysis, with an integrated alert mechanism.</p>
                <h4>Key Features</h4>
                <ul>
                    <li>Facial landmark detection for eye and mouth tracking</li>
                    <li>Eye Aspect Ratio (EAR) calculation for drowsiness detection</li>
                    <li>CNN architecture for driver state classification</li>
                    <li>Alert system with audio and visual warnings</li>
                </ul>
            `
        }
    };
    
    // Get modal elements
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');
    const closeModal = document.querySelector('.close-modal');
    
    if (!modal || !modalContent || !closeModal) return;
    
    // Add click event listeners to project boxes
    document.querySelectorAll('.project-box').forEach(box => {
        box.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const project = projects[projectId];
            
            if (project) {
                // Populate modal content
                modalContent.innerHTML = `
                    <div class="project-header">
                        <h3>${project.title}</h3>
                        <div class="project-tags">
                            ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                        </div>
                    </div>
                    <div class="project-description">
                        ${project.description}
                    </div>
                `;
                
                // Show modal
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
            }
        });
    });
    
    // Close modal when clicking the close button
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }
    });
});

// Form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you would typically send the form data to a server
        // For now, we'll just show a success message
        
        const formData = new FormData(contactForm);
        const formValues = {};
        
        formData.forEach((value, key) => {
            formValues[key] = value;
        });
        
        console.log('Form submitted:', formValues);
        
        // Reset form
        contactForm.reset();
        
        // Show success message (you could add this element to your HTML)
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
        
        contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    });
});

