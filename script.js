import { ootaItems, palyaVarieties, reviews } from './menu_data.js';

document.addEventListener('DOMContentLoaded', () => {

    lucide.createIcons();


    const ootaList = document.getElementById('oota-list');
    ootaItems.forEach(item => {
        const li = document.createElement('li');
        li.className = 'flex items-center text-sm lg:text-base font-medium transition-transform hover:translate-x-1';
        li.innerText = item;
        ootaList.appendChild(li);
    });


    const palyaList = document.getElementById('palya-list');
    palyaVarieties.forEach(palya => {
        const div = document.createElement('div');
        div.className = 'flex flex-col border-b border-stone-100 pb-2';
        div.innerHTML = `
            <span class="font-bold text-stone-800">${palya.name}</span>
            <span class="text-xs text-stone-500">${palya.desc}</span>
        `;
        palyaList.appendChild(div);
    });


    const reviewsContainer = document.getElementById('reviews-container');
    reviews.forEach((rev, idx) => {
        const div = document.createElement('div');
        div.className = `bg-white p-8 rounded-3xl border border-stone-100 shadow-sm reveal-up delay-${(idx % 3) * 100}`;
        
        let stars = '';
        for(let i=0; i<5; i++) {
            stars += `<i data-lucide="star" class="w-4 h-4 ${i < rev.rating ? 'fill-amber-500 text-amber-500' : 'text-stone-300'}"></i>`;
        }

        div.innerHTML = `
            <div class="flex gap-1 mb-4">${stars}</div>
            <p class="text-stone-700 italic mb-6 leading-relaxed">"${rev.text}"</p>
            <div class="flex justify-between items-center pt-4 border-t border-stone-50">
                <span class="font-bold text-stone-900">${rev.name}</span>
                <span class="text-xs text-stone-400">${rev.date}</span>
            </div>
        `;
        reviewsContainer.appendChild(div);
    });


    lucide.createIcons();


    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');


            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-up, .reveal-scale, .reveal-left, .reveal-right').forEach(el => {
        observer.observe(el);
    });


    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });


    const menuToggle = document.getElementById('menuToggle');
    menuToggle.addEventListener('click', () => {
        const navLinks = document.querySelector('nav div.hidden');
        if (navLinks) {
            navLinks.classList.toggle('hidden');
            navLinks.classList.toggle('flex');
            navLinks.classList.add('absolute', 'top-full', 'left-0', 'w-full', 'bg-white', 'p-6', 'flex-col', 'border-b', 'shadow-xl');
        }
    });
});
