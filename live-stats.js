// Live Statistics Data Management
class LiveStatsManager {
    constructor() {
        this.baseStats = {
            countries: 15,
            products: 125000,
            hospitals: 850,
            patients: 2500000
        };
        
        this.currentStats = { ...this.baseStats };
        this.isAnimating = false;
        this.updateInterval = null;
        
        this.init();
    }
    
    init() {
        // Start the live updates when page loads
        document.addEventListener('DOMContentLoaded', () => {
            this.startLiveUpdates();
            this.animateCounters();
        });
    }
    
    // Animate counters from 0 to current values on page load
    animateCounters() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        const duration = 2000; // 2 seconds
        const steps = 60; // 60 steps for smooth animation
        const stepDuration = duration / steps;
        
        const targets = {
            countries: this.currentStats.countries,
            products: this.currentStats.products,
            hospitals: this.currentStats.hospitals,
            patients: this.currentStats.patients
        };
        
        const increments = {
            countries: targets.countries / steps,
            products: targets.products / steps,
            hospitals: targets.hospitals / steps,
            patients: targets.patients / steps
        };
        
        let currentStep = 0;
        
        const animate = () => {
            currentStep++;
            
            // Update each counter
            const countriesEl = document.getElementById('countriesCount');
            const productsEl = document.getElementById('productsCount');
            const hospitalsEl = document.getElementById('hospitalsCount');
            const patientsEl = document.getElementById('patientsCount');
            
            if (countriesEl) {
                countriesEl.textContent = Math.floor(increments.countries * currentStep);
            }
            if (productsEl) {
                productsEl.textContent = this.formatNumber(Math.floor(increments.products * currentStep));
            }
            if (hospitalsEl) {
                hospitalsEl.textContent = this.formatNumber(Math.floor(increments.hospitals * currentStep));
            }
            if (patientsEl) {
                patientsEl.textContent = this.formatNumber(Math.floor(increments.patients * currentStep));
            }
            
            if (currentStep < steps) {
                setTimeout(animate, stepDuration);
            } else {
                // Final update with exact values
                this.updateDisplay();
                this.isAnimating = false;
            }
        };
        
        animate();
    }
    
    // Start live updates every 30 seconds
    startLiveUpdates() {
        // Initial update
        this.updateStats();

        // Set up interval for live updates
        this.updateInterval = setInterval(() => {
            this.updateStats();
        }, 30000); // Update every 30 seconds
    }
    
    // Simulate live data updates
    updateStats() {
        // Simulate realistic increments
        const now = new Date();
        const timeOfDay = now.getHours();
        
        // More activity during business hours (8 AM - 6 PM)
        const isBusinessHours = timeOfDay >= 8 && timeOfDay <= 18;
        const activityMultiplier = isBusinessHours ? 1.5 : 0.5;
        
        // Countries grow slowly (maybe 1-2 new countries per month)
        if (Math.random() < 0.001) { // Very rare
            this.currentStats.countries += 1;
        }
        
        // Products distributed - varies throughout the day
        const productIncrement = Math.floor((Math.random() * 50 + 10) * activityMultiplier);
        this.currentStats.products += productIncrement;

        // Hospitals - grows occasionally
        if (Math.random() < 0.01) { // 1% chance
            this.currentStats.hospitals += Math.floor(Math.random() * 3 + 1);
        }

        // Patients served - most active metric
        const patientIncrement = Math.floor((Math.random() * 100 + 20) * activityMultiplier);
        this.currentStats.patients += patientIncrement;
        
        // Update the display
        this.updateDisplay();
        
        // Add visual feedback for updates
        this.highlightUpdatedStats();
    }
    
    // Update the display with current stats
    updateDisplay() {
        const countriesEl = document.getElementById('countriesCount');
        const productsEl = document.getElementById('productsCount');
        const hospitalsEl = document.getElementById('hospitalsCount');
        const patientsEl = document.getElementById('patientsCount');
        
        if (countriesEl) {
            countriesEl.textContent = this.currentStats.countries;
        }
        if (productsEl) {
            productsEl.textContent = this.formatNumber(this.currentStats.products);
        }
        if (hospitalsEl) {
            hospitalsEl.textContent = this.formatNumber(this.currentStats.hospitals);
        }
        if (patientsEl) {
            patientsEl.textContent = this.formatNumber(this.currentStats.patients);
        }
    }
    
    // Add visual feedback when stats update
    highlightUpdatedStats() {
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach(card => {
            // Add a subtle glow effect
            card.style.transform = 'scale(1.02)';
            card.style.transition = 'transform 0.3s ease';
            
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 300);
        });
    }
    
    // Format numbers with commas
    formatNumber(num) {
        return num.toLocaleString();
    }
    
    // Get current stats (for debugging)
    getCurrentStats() {
        return { ...this.currentStats };
    }
    
    // Reset stats to base values
    resetStats() {
        this.currentStats = { ...this.baseStats };
        this.updateDisplay();
    }
    
    // Stop live updates
    stopLiveUpdates() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }
}

// Initialize the live stats manager
const liveStats = new LiveStatsManager();

// Add CSS for pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.7; transform: scale(1.1); }
        100% { opacity: 1; transform: scale(1); }
    }
    
    .stat-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .stat-card:hover {
        transform: translateY(-5px) !important;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2) !important;
    }
    
    @media (max-width: 768px) {
        .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1rem !important;
        }
        
        .stat-card {
            padding: 1.5rem !important;
        }
        
        .stat-number {
            font-size: 2rem !important;
        }
        
        .stat-icon {
            font-size: 2rem !important;
        }
    }
    
    @media (max-width: 480px) {
        .stats-grid {
            grid-template-columns: 1fr !important;
        }
    }
`;
document.head.appendChild(style);

// Export for debugging purposes
window.liveStats = liveStats;
