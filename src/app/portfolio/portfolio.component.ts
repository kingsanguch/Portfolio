import {
  Component,
  AfterViewInit,
  NgZone,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Typed from 'typed.js';
import VanillaTilt from 'vanilla-tilt';
import { LottieComponent, provideLottieOptions } from 'ngx-lottie';
import type { AnimationOptions } from 'ngx-lottie';
import Swiper from 'swiper/bundle';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LottieComponent
  ],
  providers: [
    provideLottieOptions({
      player: () => import('lottie-web'),
    }),
  ],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements AfterViewInit {
  formData = { name: '', email: '', message: '' };
  isDarkMode = true;

  githubOptions: AnimationOptions = {
    path: 'assets/github.json',
    autoplay: true,
    loop: true
  };
  linkedinOptions: AnimationOptions = {
    path: 'assets/linkedin.json',
    autoplay: true,
    loop: true
  };

  techSkills: string[] = [
    'REST API',
    'Bootstrap',
    'HTML',
    'Angular Material',
    'TypeScript',
    'JavaScript',
    'Java',
    'Postman',
    'Angular'
  ];

  constructor(
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Delay to ensure DOM is fully rendered
      setTimeout(() => {
        this.initTyped();
        this.initAnimations();
        this.initTilt();
        this.initSwiper();
      }, 100); // Increased delay to 100ms
    }
  }

  private initTyped() {
    new Typed('#typed', {
      strings: [
        'John Sangura',
        'Software Engineer | UI/UX Dev',
        'Angular ⚡ Spring Boot Dev',
        'Innovating One Line at a Time',
        'Let\'s Solve Real Problems',
        'Building Scalable Solutions',
        'Making Code Work Like Magic ✨',
        'Tech With a Touch of Art 🎨'
      ],
      typeSpeed: 60,
      backSpeed: 30,
      backDelay: 1500,
      loop: true
    });
  }

  private initTilt() {
    document.querySelectorAll<HTMLElement>('.tilt-wrapper').forEach(el => {
      VanillaTilt.init(el, {
        max: 15,
        speed: 400,
        glare: true,
        'max-glare': 0.3
      });
    });
  }

  private initAnimations() {
    // Navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      gsap.set(navbar, { y: -50, opacity: 0 });
      gsap.to(navbar, { y: 0, opacity: 1, duration: 1, ease: 'power2.out' });
    }

    // Hero
    gsap.set('.hero-background-img', { scale: 1.2, opacity: 0 });
    gsap.to('.hero-background-img', { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out' });
    gsap.set('#home .hero-content > *', { opacity: 0, y: 20 });
    gsap.to('#home .hero-content > *', {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      delay: 0.5,
      ease: 'power2.out'
    });

    // About image
    gsap.set('#about img', { scale: 0.8, opacity: 0 });
    gsap.to('#about img', {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#about',
        start: 'top 90%' // Adjusted to trigger earlier
      }
    });

    // About paragraph
    const aboutParagraph = document.querySelector('.lead.fade-in');
    if (aboutParagraph) {
      gsap.set(aboutParagraph, { opacity: 0, x: -50 });
      gsap.to(aboutParagraph, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: aboutParagraph,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    // Timeline items
    gsap.utils.toArray<HTMLElement>('.timeline li.fade-in').forEach(el => {
      gsap.set(el, { opacity: 0, y: 20 });
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    // Tech marbles
    const marbles = gsap.utils.toArray<HTMLElement>('.tech-marble.fade-in');
    const numMarbles = marbles.length;
    const radius = Math.max(150, 20 * numMarbles); // Dynamic radius to prevent overlap
    marbles.forEach((el, i) => {
      gsap.set(el, { opacity: 0, scale: 0 });
      gsap.to(el, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        },
        onComplete: () => {
          const angle = (i / numMarbles) * Math.PI * 2;
          gsap.to(el, {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
            duration: 2,
            ease: 'power1.inOut',
            repeat: -1,
            yoyo: true
          });
        }
      });
    });

    // Projects
    gsap.set('#projects h2', { opacity: 0, y: 20 });
    gsap.to('#projects h2', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: { trigger: '#projects', start: 'top 90%' }
    });

    // Contact
    gsap.set('#contact form > *', { opacity: 0, y: 20 });
    gsap.to('#contact form > *', {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger: { trigger: '#contact', start: 'top 90%' }
    });
    gsap.set('#contact button', { scale: 0.8 });
    gsap.to('#contact button', {
      scale: 1,
      duration: 0.5,
      ease: 'bounce.out',
      scrollTrigger: { trigger: '#contact', start: 'top 90%' }
    });

    // Footer
    gsap.set('footer', { opacity: 0 });
    gsap.to('footer', {
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: { trigger: 'footer', start: 'top bottom' }
    });
  }

  private initSwiper() {
    new Swiper('.swiper', {
      effect: 'slide',
      loop: true,
      autoplay: { delay: 5000 },
      slidesPerView: 1,
      spaceBetween: 30,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      breakpoints: {
        768: { slidesPerView: 2 },
        992: { slidesPerView: 3 }
      }
    });
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('light-mode', !this.isDarkMode);
  }

  onSubmit() {
    const { name, email, message } = this.formData;
    if (isPlatformBrowser(this.platformId)) {
      (window as any).Email.send({
        SecureToken: 'your-secure-token',
        To: 'your-email@example.com',
        From: email,
        Subject: `New message from ${name}`,
        Body: message
      }).then(() => {
        this.ngZone.run(() => {
          alert('Message sent successfully!');
          this.formData = { name: '', email: '', message: '' };
        });
      });
    }
  }
}