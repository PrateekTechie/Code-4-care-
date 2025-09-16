// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Chat functionality
document.addEventListener("DOMContentLoaded", () => {
  const chatInput = document.querySelector(".chat-input input")
  const sendBtn = document.querySelector(".send-btn")
  const chatMessages = document.querySelector(".chat-messages")
  const questionTags = document.querySelectorAll(".question-tag")

  // Handle send button click
  if (sendBtn) {
    sendBtn.addEventListener("click", sendMessage)
  }

  // Handle enter key press
  if (chatInput) {
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        sendMessage()
      }
    })
  }

  // Handle quick question clicks
  questionTags.forEach((tag) => {
    tag.addEventListener("click", function () {
      if (chatInput) {
        chatInput.value = this.textContent
        sendMessage()
      }
    })
  })

  function sendMessage() {
    const message = chatInput.value.trim()
    if (message) {
      // Add user message
      addMessage(message, "user")
      chatInput.value = ""

      // Simulate AI response after a delay
      setTimeout(() => {
        const responses = [
          "Thank you for your question about " +
            message +
            ". Based on current medical knowledge, I recommend consulting with a healthcare professional for personalized advice.",
          "I understand you're asking about " +
            message +
            ". Here are some general guidelines, but please remember that this is not a substitute for professional medical advice.",
          "That's a great question about " +
            message +
            ". Let me provide you with some helpful information while emphasizing the importance of consulting healthcare providers.",
        ]
        const randomResponse = responses[Math.floor(Math.random() * responses.length)]
        addMessage(randomResponse, "bot")
      }, 1000)
    }
  }

  function addMessage(text, sender) {
    const messageDiv = document.createElement("div")
    messageDiv.className = `message ${sender}-message`

    if (sender === "user") {
      messageDiv.innerHTML = `
                <div class="message-avatar" style="background: #374151;">
                    <i class="fas fa-user"></i>
                </div>
                <div class="message-content">
                    <div class="message-label">You</div>
                    <p>${text}</p>
                </div>
            `
    } else {
      messageDiv.innerHTML = `
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <div class="message-label">AI Assistant</div>
                    <p>${text}</p>
                </div>
            `
    }

    if (chatMessages) {
      chatMessages.appendChild(messageDiv)
      chatMessages.scrollTop = chatMessages.scrollHeight
    }
  }
})

// Add scroll effect to header
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (header) {
    if (window.scrollY > 100) {
      header.style.background = "rgba(55, 65, 81, 0.95)"
      header.style.backdropFilter = "blur(10px)"
    } else {
      header.style.background = "#374151"
      header.style.backdropFilter = "none"
    }
  }
})

// Animate statistics when they come into view
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const statNumbers = entry.target.querySelectorAll(".stat-number")
      statNumbers.forEach((stat) => {
        animateNumber(stat)
      })
    }
  })
}, observerOptions)

const statsSection = document.querySelector(".statistics")
if (statsSection) {
  observer.observe(statsSection)
}

function animateNumber(element) {
  const target = element.textContent
  const isPercentage = target.includes("%")
  const isTime = target.includes("/")
  const isPlus = target.includes("+")

  let numericTarget
  if (isTime) {
    numericTarget = 24
  } else if (isPercentage) {
    numericTarget = Number.parseInt(target)
  } else {
    numericTarget = Number.parseInt(target.replace(/[^\d]/g, ""))
  }

  let current = 0
  const increment = numericTarget / 50
  const timer = setInterval(() => {
    current += increment
    if (current >= numericTarget) {
      current = numericTarget
      clearInterval(timer)
    }

    let displayValue
    if (isTime) {
      displayValue = Math.floor(current) + "/7"
    } else if (isPercentage) {
      displayValue = Math.floor(current) + "%"
    } else if (isPlus) {
      displayValue = Math.floor(current) + "K+"
    } else {
      displayValue = Math.floor(current) + "M+"
    }

    element.textContent = displayValue
  }, 50)
}

// Mobile menu toggle (if needed)
const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
const nav = document.querySelector(".nav")

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    nav.classList.toggle("active")
  })
}

// Add loading animation to buttons
document.querySelectorAll(".btn-primary, .btn-secondary").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    if (!this.classList.contains("loading")) {
      this.classList.add("loading")
      setTimeout(() => {
        this.classList.remove("loading")
      }, 2000)
    }
  })
})

// Form validation (if contact form exists)
const contactForm = document.querySelector(".contact-form")
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    // Simple validation
    const inputs = this.querySelectorAll("input[required], textarea[required]")
    let isValid = true

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        input.classList.add("error")
        isValid = false
      } else {
        input.classList.remove("error")
      }
    })

    if (isValid) {
      // Simulate form submission
      const submitBtn = this.querySelector('button[type="submit"]')
      submitBtn.textContent = "Sending..."
      submitBtn.disabled = true

      setTimeout(() => {
        alert("Thank you for your message! We will get back to you soon.")
        this.reset()
        submitBtn.textContent = "Send Message"
        submitBtn.disabled = false
      }, 2000)
    }
  })
}

// Password toggle functionality
function togglePassword(inputId) {
  const input = document.getElementById(inputId)
  const toggle = input.parentElement.querySelector(".password-toggle i")

  if (input.type === "password") {
    input.type = "text"
    toggle.classList.remove("fa-eye")
    toggle.classList.add("fa-eye-slash")
  } else {
    input.type = "password"
    toggle.classList.remove("fa-eye-slash")
    toggle.classList.add("fa-eye")
  }
}

// Sign In Form Handling
const signinForm = document.getElementById("signinForm")
if (signinForm) {
  signinForm.addEventListener("submit", function (e) {
    e.preventDefault()

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const remember = document.querySelector('input[name="remember"]').checked

    // Basic validation
    if (!email || !password) {
      showNotification("Please fill in all required fields", "error")
      return
    }

    if (!isValidEmail(email)) {
      showNotification("Please enter a valid email address", "error")
      return
    }

    // Show loading state
    const submitBtn = this.querySelector(".auth-btn")
    const originalText = submitBtn.innerHTML
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...'
    submitBtn.disabled = true

    // Simulate API call
    setTimeout(() => {
      // Reset button
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false

      // Simulate successful login
      showNotification("Welcome back! Redirecting to dashboard...", "success")

      // Store user session (in real app, this would be handled by backend)
      if (remember) {
        localStorage.setItem("rememberUser", "true")
      }

      // Redirect after success
      setTimeout(() => {
        window.location.href = "index.html"
      }, 2000)
    }, 2000)
  })
}

// Sign Up Form Handling
const signupForm = document.getElementById("signupForm")
if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault()

    const firstName = document.getElementById("firstName").value
    const lastName = document.getElementById("lastName").value
    const email = document.getElementById("email").value
    const phone = document.getElementById("phone").value
    const age = document.getElementById("age").value
    const gender = document.getElementById("gender").value
    const password = document.getElementById("password").value
    const confirmPassword = document.getElementById("confirmPassword").value
    const termsAccepted = document.querySelector('input[name="terms"]').checked

    // Validation
    if (!firstName || !lastName || !email || !phone || !age || !gender || !password || !confirmPassword) {
      showNotification("Please fill in all required fields", "error")
      return
    }

    if (!isValidEmail(email)) {
      showNotification("Please enter a valid email address", "error")
      return
    }

    if (!isValidPhone(phone)) {
      showNotification("Please enter a valid phone number", "error")
      return
    }

    if (age < 1 || age > 120) {
      showNotification("Please enter a valid age", "error")
      return
    }

    if (password.length < 8) {
      showNotification("Password must be at least 8 characters long", "error")
      return
    }

    if (password !== confirmPassword) {
      showNotification("Passwords do not match", "error")
      return
    }

    if (!termsAccepted) {
      showNotification("Please accept the Terms of Service and Privacy Policy", "error")
      return
    }

    // Show loading state
    const submitBtn = this.querySelector(".auth-btn")
    const originalText = submitBtn.innerHTML
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...'
    submitBtn.disabled = true

    // Simulate API call
    setTimeout(() => {
      // Reset button
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false

      // Simulate successful registration
      showNotification("Account created successfully! Please check your email for verification.", "success")

      // Redirect after success
      setTimeout(() => {
        window.location.href = "signin.html"
      }, 3000)
    }, 2500)
  })
}

// Social authentication handlers
document.querySelectorAll(".social-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const provider = this.textContent.trim()
    showNotification(`${provider} authentication will be available soon!`, "info")
  })
})

// Utility functions
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function isValidPhone(phone) {
  const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/\s/g, ""))
}

function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification")
  if (existingNotification) {
    existingNotification.remove()
  }

  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas ${getNotificationIcon(type)}"></i>
      <span>${message}</span>
      <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `

  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10000;
    max-width: 400px;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    animation: slideIn 0.3s ease-out;
    ${getNotificationStyles(type)}
  `

  // Add to page
  document.body.appendChild(notification)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = "slideOut 0.3s ease-in"
      setTimeout(() => notification.remove(), 300)
    }
  }, 5000)
}

function getNotificationIcon(type) {
  switch (type) {
    case "success":
      return "fa-check-circle"
    case "error":
      return "fa-exclamation-circle"
    case "warning":
      return "fa-exclamation-triangle"
    default:
      return "fa-info-circle"
  }
}

function getNotificationStyles(type) {
  switch (type) {
    case "success":
      return "background: #10b981; color: white;"
    case "error":
      return "background: #ef4444; color: white;"
    case "warning":
      return "background: #f59e0b; color: white;"
    default:
      return "background: #6366f1; color: white;"
  }
}

// Add notification animations to CSS
const notificationStyles = document.createElement("style")
notificationStyles.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  .notification-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .notification-close {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    padding: 0.25rem;
    margin-left: auto;
  }
  
  .notification-close:hover {
    opacity: 0.8;
  }
`
document.head.appendChild(notificationStyles)

// Form input enhancements
document.querySelectorAll(".input-group input, .input-group select").forEach((input) => {
  // Add focus effects
  input.addEventListener("focus", function () {
    this.parentElement.classList.add("focused")
  })

  input.addEventListener("blur", function () {
    this.parentElement.classList.remove("focused")

    // Validate on blur
    if (this.hasAttribute("required") && !this.value.trim()) {
      this.classList.add("error")
    } else {
      this.classList.remove("error")
    }

    // Email validation
    if (this.type === "email" && this.value && !isValidEmail(this.value)) {
      this.classList.add("error")
    }
  })

  // Remove error state on input
  input.addEventListener("input", function () {
    this.classList.remove("error")
  })
})

// Add input group focus styles
const inputStyles = document.createElement("style")
inputStyles.textContent = `
  .input-group.focused {
    transform: translateY(-1px);
  }
  
  .input-group input.error,
  .input-group select.error {
    border-color: #ef4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  }
  
  .loading {
    opacity: 0.7;
    pointer-events: none;
  }
`
document.head.appendChild(inputStyles)
