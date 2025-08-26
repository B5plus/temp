# PharmaCorp - Pharmaceutical E-commerce Website

A comprehensive e-commerce website for pharmaceutical manufacturing and distribution, designed with modern web technologies and industry-specific features.

## 🏥 Features

### Core E-commerce Functionality
- **Product Catalog**: Browse pharmaceutical products by category
- **Shopping Cart**: Add/remove items with quantity management
- **Search & Filter**: Advanced filtering by category, price, prescription requirements
- **Responsive Design**: Mobile-friendly interface
- **Product Details**: Comprehensive product information including dosage, manufacturer

### Pharmaceutical-Specific Features
- **Prescription Requirements**: Clear indication of prescription-only medicines
- **Safety Information**: Comprehensive safety guidelines and warnings
- **Regulatory Compliance**: FDA, GMP, ISO certifications display
- **Adverse Event Reporting**: Form for reporting medication side effects
- **Emergency Contacts**: 24/7 safety hotline and emergency information
- **Dosage Information**: Detailed medication specifications

### Product Categories
1. **Prescription Drugs** - Medications requiring doctor's prescription
2. **OTC Medicines** - Over-the-counter medications
3. **Supplements** - Vitamins and nutritional supplements
4. **Medical Devices** - Professional medical equipment

## 📁 Project Structure

```
Pharma/
├── index.html          # Homepage with hero section and featured products
├── products.html       # Product catalog with filtering and pagination
├── about.html          # Company information and leadership team
├── safety.html         # Safety guidelines and compliance information
├── styles.css          # Main stylesheet with responsive design
├── script.js           # Core JavaScript functionality
├── products.js         # Product page specific JavaScript
└── README.md          # Project documentation
```

## 🚀 Getting Started

1. **Clone or download** the project files
2. **Open index.html** in a web browser
3. **Navigate** through the different pages using the navigation menu

### Local Development
For local development with live reload, you can use any local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

## 🎨 Design Features

### Visual Design
- **Modern UI**: Clean, professional pharmaceutical industry design
- **Color Scheme**: Blue primary (#2563eb) with red accents for safety warnings
- **Typography**: Inter font family for readability
- **Icons**: Font Awesome icons for enhanced UX
- **Images**: High-quality pharmaceutical and medical imagery

### User Experience
- **Intuitive Navigation**: Clear menu structure with breadcrumbs
- **Search Functionality**: Real-time product search
- **Cart Management**: Persistent shopping cart with item management
- **Modal Windows**: Product details and cart in overlay modals
- **Notifications**: Success messages for user actions

## 🔒 Safety & Compliance Features

### Regulatory Compliance
- **FDA Approval** indicators
- **GMP Certification** display
- **ISO 9001:2015** compliance
- **WHO Prequalification** status
- **HIPAA Compliance** for data protection

### Safety Features
- **Prescription Warnings**: Clear indication of prescription requirements
- **Dosage Information**: Detailed medication specifications
- **Storage Guidelines**: Proper medication storage instructions
- **Emergency Contacts**: 24/7 safety hotline
- **Adverse Event Reporting**: Standardized reporting form

## 💻 Technical Implementation

### Frontend Technologies
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with Flexbox and Grid layouts
- **JavaScript (ES6+)**: Interactive functionality and DOM manipulation
- **Font Awesome**: Icon library for enhanced UI
- **Google Fonts**: Inter font family for typography

### Key JavaScript Features
- **Product Management**: Dynamic product loading and filtering
- **Shopping Cart**: Local storage persistence
- **Search Engine**: Real-time product search
- **Pagination**: Product catalog pagination
- **Form Validation**: Contact and reporting forms
- **Modal System**: Product details and cart modals

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Breakpoints**: Tablet and desktop responsive layouts
- **Touch-Friendly**: Large buttons and touch targets
- **Performance**: Optimized images and efficient CSS

## 🛡️ Security Considerations

### Data Protection
- **No Sensitive Data Storage**: No actual payment or medical data stored
- **Form Validation**: Client-side input validation
- **HTTPS Ready**: Designed for secure connections
- **Privacy Compliance**: HIPAA-compliant design principles

### Pharmaceutical Compliance
- **Prescription Verification**: Clear prescription requirements
- **Age Verification**: Placeholder for age verification systems
- **Medical Disclaimers**: Comprehensive safety warnings
- **Professional Consultation**: Emphasis on healthcare provider consultation

## 🔧 Customization

### Adding New Products
Edit the `products` array in `script.js`:

```javascript
const products = [
    {
        id: 9,
        name: "New Medication",
        category: "prescription",
        price: 45.99,
        description: "Description of the medication",
        image: "image-url",
        prescription: true,
        dosage: "250mg tablets",
        manufacturer: "PharmaCorp"
    }
];
```

### Styling Customization
- **Colors**: Modify CSS custom properties in `styles.css`
- **Fonts**: Change font imports in HTML head sections
- **Layout**: Adjust Grid and Flexbox properties
- **Components**: Modify individual component styles

### Adding New Pages
1. Create new HTML file following existing structure
2. Include necessary CSS and JavaScript files
3. Update navigation menus in all pages
4. Add page-specific functionality if needed

## 📱 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+
- **Mobile browsers** (iOS Safari, Chrome Mobile)

## 🚨 Important Disclaimers

⚠️ **This is a demonstration website for educational purposes only**

- **Not for actual pharmaceutical sales**
- **No real payment processing**
- **No actual prescription verification**
- **Always consult healthcare professionals for medical advice**
- **Comply with local regulations for pharmaceutical e-commerce**

## 📄 License

This project is created for educational and demonstration purposes. Please ensure compliance with local pharmaceutical regulations before using for commercial purposes.

## 🤝 Contributing

This is a demonstration project. For educational use, feel free to:
- Add new features
- Improve accessibility
- Enhance mobile responsiveness
- Add more pharmaceutical-specific functionality

## 📞 Support

For questions about this demonstration project:
- Review the code comments for implementation details
- Check browser console for any JavaScript errors
- Ensure all files are properly linked and accessible

---

**Built with ❤️ for pharmaceutical industry demonstration**
# temp
