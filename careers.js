// Career form functionality
document.addEventListener('DOMContentLoaded', function() {
    const careerForm = document.getElementById('careerForm');
    const positionSelect = document.getElementById('position');
    
    // Handle form submission
    careerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(careerForm);
        const cvFile = formData.get('cvUpload');

        const applicationData = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            position: formData.get('position'),
            experience: formData.get('experience'),
            coverLetter: formData.get('coverLetter'),
            cvFileName: cvFile ? cvFile.name : null,
            cvFileSize: cvFile ? cvFile.size : null,
            submittedAt: new Date().toISOString()
        };

        // Validate required fields
        if (!applicationData.firstName || !applicationData.lastName || !applicationData.email || !applicationData.phone || !cvFile) {
            showNotification('Please fill in all required fields including CV upload.', 'error');
            return;
        }

        // Validate CV file
        if (cvFile) {
            const maxSize = 5 * 1024 * 1024; // 5MB
            const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

            if (cvFile.size > maxSize) {
                showNotification('CV file size must be less than 5MB.', 'error');
                return;
            }

            if (!allowedTypes.includes(cvFile.type)) {
                showNotification('Please upload a valid CV file (PDF, DOC, or DOCX).', 'error');
                return;
            }
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(applicationData.email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Store application data (in a real app, this would be sent to a server)
        storeApplication(applicationData);
        
        // Show success message
        showSuccessMessage(applicationData);
        
        // Reset form
        careerForm.reset();
    });
    
    // Store application data in localStorage (demo purposes)
    function storeApplication(data) {
        let applications = JSON.parse(localStorage.getItem('careerApplications') || '[]');
        applications.push(data);
        localStorage.setItem('careerApplications', JSON.stringify(applications));
    }
    
    // Show success message
    function showSuccessMessage(data) {
        const positionText = data.position ? getPositionName(data.position) : 'a position';
        
        const message = `Thank you, ${data.firstName}! Your application for ${positionText} has been submitted successfully. We will review your application and contact you within 5-7 business days.`;
        
        showNotification(message, 'success');
    }
    
    // Get position name from value
    function getPositionName(value) {
        const positions = {
            'quality-analyst': 'Quality Control Analyst',
            'research-scientist': 'Research Scientist',
            'production-manager': 'Production Manager',
            'regulatory-affairs': 'Regulatory Affairs Specialist',
            'sales-representative': 'Sales Representative',
            'other': 'Other Position'
        };
        return positions[value] || 'a position';
    }
    
    // Show notification
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 3000;
            animation: slideIn 0.3s ease;
            max-width: 400px;
            line-height: 1.5;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, type === 'success' ? 5000 : 3000);
    }
});

// Function to scroll to application form and pre-select position
function scrollToApplication(position) {
    const applicationForm = document.querySelector('.application-form');
    const positionSelect = document.getElementById('position');
    
    // Scroll to form
    applicationForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Pre-select the position
    if (positionSelect && position) {
        positionSelect.value = position;
        
        // Add a highlight effect to the form
        applicationForm.style.transform = 'scale(1.02)';
        applicationForm.style.transition = 'transform 0.3s ease';
        
        setTimeout(() => {
            applicationForm.style.transform = 'scale(1)';
        }, 300);
    }
}

// Add CSS animations if not already present
if (!document.querySelector('#career-animations')) {
    const style = document.createElement('style');
    style.id = 'career-animations';
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .application-form {
            transition: transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

// Admin function to view applications (for demo purposes)
function viewApplications() {
    const applications = JSON.parse(localStorage.getItem('careerApplications') || '[]');
    console.log('Career Applications:', applications);
    return applications;
}

// Function to clear all applications (for demo purposes)
function clearApplications() {
    localStorage.removeItem('careerApplications');
    console.log('All applications cleared');
}
