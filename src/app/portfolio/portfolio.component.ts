import { Component, AfterViewInit, NgZone, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements AfterViewInit {
  // Contact form data
  formData = {
    name: '',
    email: '',
    message: ''
  };

  constructor(
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Register GSAP plugin only in the browser
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);
    }
  }

  ngAfterViewInit() {
    // Run animations only in the browser
    if (isPlatformBrowser(this.platformId)) {
      // Hero section animation (ensure visibility first, then animate)
      const heroContent = document.querySelector('#home .hero-content');
      if (heroContent) {
        // Set initial visibility to ensure content shows even if GSAP fails
        (heroContent as HTMLElement).style.opacity = '1';
        gsap.fromTo(
          heroContent,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            delay: 0.5, // Increased delay to ensure DOM readiness
            onComplete: () => {
              this.ngZone.run(() => {});
            }
          }
        );
      }

      // Navbar and other section animations (run outside Angular's zone for performance)
      this.ngZone.runOutsideAngular(() => {
        try {
          // Navbar slide-in animation
          const navbar = document.querySelector('.navbar');
          if (navbar) {
            gsap.fromTo(
              navbar,
              { y: -50, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power2.out',
                onComplete: () => {
                  this.ngZone.run(() => {});
                }
              }
            );
          }

          // Fade-in animations for other sections (About, Projects, Contact)
          const fadeInElements = gsap.utils.toArray<HTMLElement>('.fade-in');
          if (fadeInElements.length > 0) {
            fadeInElements.forEach(element => {
              gsap.fromTo(
                element,
                { opacity: 0, y: 20 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 1,
                  scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                  },
                  onComplete: () => {
                    this.ngZone.run(() => {});
                  }
                }
              );
            });
          }
        } catch (error) {
          console.error('GSAP animation error:', error);
          this.ngZone.run(() => {});
        }
      });
    }
  }

  // Contact form submission
  onSubmit() {
    const { name, email, message } = this.formData;
    if (isPlatformBrowser(this.platformId)) {
      (window as any).Email.send({
        SecureToken: 'your-secure-token', // Replace with your SMTPJS token
        To: 'your-email@example.com',
        From: email,
        Subject: `New message from ${name}`,
        Body: message
      }).then((response: string) => {
        this.ngZone.run(() => {
          alert('Message sent successfully!');
          this.formData = { name: '', email: '', message: '' };
        });
      });
    }
  }
}