/* ===================================================================
   TribuDudu — Interactive Logic & Multi-language Management
   =================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Multi-language Management
  let currentLang = localStorage.getItem("tribududu_lang") || "fr";

  // Gallery Data for Lightbox
  const galleries = {
    studio: [
      { src: "assets/images/studio-balcon-mer.jpg", caption: "Balcon privatif avec vue sur la mer Méditerranée" },
      { src: "assets/images/studio-sejour.jpg", caption: "Séjour lumineux avec canapé-lit double, TV et espace repas" },
      { src: "assets/images/studio-cuisine.jpg", caption: "Kitchenette équipée avec plaques et four micro-ondes" },
      { src: "assets/images/studio-cabine.jpg", caption: "Coin cabine fermé avec lits superposés et lave-linge" },
      { src: "assets/images/studio-salle-eau.jpg", caption: "Salle d'eau moderne avec cabine de douche et lavabo" }
    ],
    appart: [
      { src: "assets/images/appart-terrasse-mer.jpg", caption: "Grande terrasse privative avec vue panoramique mer" },
      { src: "assets/images/appart-salon.jpg", caption: "Vaste séjour contemporain baigné de lumière" },
      { src: "assets/images/appart-cuisine-sejour.jpg", caption: "Cuisine moderne toute équipée (four, micro-ondes, lave-vaisselle)" },
      { src: "assets/images/appart-chambre-1.jpg", caption: "Chambre 1 avec lit double grand confort" },
      { src: "assets/images/appart-chambre-2.jpg", caption: "Chambre 2 avec lit double" },
      { src: "assets/images/hero-lavandou-vue-mer.jpg", caption: "Vue imprenable sur la baie du Lavandou depuis la résidence" }
    ]
  };

  function setLanguage(lang) {
    if (!translations[lang]) lang = "fr";
    currentLang = lang;
    localStorage.setItem("tribududu_lang", lang);
    document.documentElement.lang = lang;

    // Update active language button
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      if (btn.dataset.lang === lang) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Update elements with data-i18n
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    // Update elements with data-i18n-ph (placeholders)
    document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
      const key = el.getAttribute("data-i18n-ph");
      if (translations[lang][key]) {
        el.setAttribute("placeholder", translations[lang][key]);
      }
    });
  }

  // Attach language click listeners
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      setLanguage(btn.dataset.lang);
    });
  });

  // Initialize language
  setLanguage(currentLang);

  // 2. Header Scroll Effect
  const header = document.querySelector(".site-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // 3. Mobile Navigation Drawer
  const mobileBtn = document.querySelector(".mobile-menu-btn");
  const mainNav = document.querySelector(".main-nav");

  if (mobileBtn && mainNav) {
    mobileBtn.addEventListener("click", () => {
      mobileBtn.classList.toggle("open");
      mainNav.classList.toggle("open");
    });

    // Close mobile nav when clicking any nav link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        mobileBtn.classList.remove("open");
        mainNav.classList.remove("open");
      });
    });
  }

  // 4. Interactive Property Photos & Lightbox
  const lightboxModal = document.getElementById("lightbox-modal");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = document.getElementById("lightbox-close");
  const lightboxPrev = document.getElementById("lightbox-prev");
  const lightboxNext = document.getElementById("lightbox-next");

  let currentGallery = [];
  let currentPhotoIndex = 0;

  function openLightbox(galleryKey, index = 0) {
    if (!galleries[galleryKey]) return;
    currentGallery = galleries[galleryKey];
    currentPhotoIndex = index;
    updateLightbox();
    lightboxModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightboxModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  function updateLightbox() {
    const item = currentGallery[currentPhotoIndex];
    if (!item) return;
    lightboxImg.src = item.src;
    lightboxCaption.textContent = `${item.caption} (${currentPhotoIndex + 1}/${currentGallery.length})`;
  }

  function nextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % currentGallery.length;
    updateLightbox();
  }

  function prevPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + currentGallery.length) % currentGallery.length;
    updateLightbox();
  }

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener("click", nextPhoto);
  if (lightboxPrev) lightboxPrev.addEventListener("click", prevPhoto);

  if (lightboxModal) {
    lightboxModal.addEventListener("click", (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (!lightboxModal.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextPhoto();
    if (e.key === "ArrowLeft") prevPhoto();
  });

  // Attach gallery triggers to property cards
  document.querySelectorAll("[data-gallery]").forEach((el) => {
    const galleryKey = el.dataset.gallery;

    // Click on main photo
    const mainPhoto = el.querySelector(".main-photo-wrap");
    if (mainPhoto) {
      mainPhoto.addEventListener("click", () => openLightbox(galleryKey, 0));
    }

    // Click on thumbnails
    el.querySelectorAll(".thumb-item").forEach((thumb, idx) => {
      thumb.addEventListener("click", () => {
        // Change main photo preview
        const targetSrc = galleries[galleryKey][idx]?.src;
        if (targetSrc && mainPhoto) {
          mainPhoto.querySelector("img").src = targetSrc;
        }
        // Open lightbox
        openLightbox(galleryKey, idx);
      });
    });

    // "Voir toutes les photos" button
    const viewAllBtn = el.querySelector(".btn-view-photos");
    if (viewAllBtn) {
      viewAllBtn.addEventListener("click", () => openLightbox(galleryKey, 0));
    }
  });

  // Quick inquire property button
  document.querySelectorAll(".btn-inquire-prop").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const propVal = btn.dataset.prop;
      const select = document.getElementById("inquiry-property");
      if (select && propVal) {
        select.value = propVal;
      }
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // 5. Contact Form Handler (Direct mailto + Copy formatted message)
  const contactForm = document.getElementById("stay-inquiry-form");
  const copyBtn = document.getElementById("btn-copy-inquiry");
  const toast = document.getElementById("toast");

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3500);
  }

  function formatInquiryText() {
    const name = document.getElementById("inquiry-name")?.value.trim() || "Visiteur";
    const email = document.getElementById("inquiry-email")?.value.trim() || "Non spécifié";
    const phone = document.getElementById("inquiry-phone")?.value.trim() || "Non spécifié";
    const prop = document.getElementById("inquiry-property")?.value || "Non spécifié";
    const arrival = document.getElementById("inquiry-arrival")?.value || "À définir";
    const departure = document.getElementById("inquiry-departure")?.value || "À définir";
    const guests = document.getElementById("inquiry-guests")?.value || "Non spécifié";
    const message = document.getElementById("inquiry-message")?.value.trim() || "";

    const text = 
`Bonjour Famille Dugail - Van Asbroeck,

Je souhaiterais vous contacter pour une demande de séjour chez TribuDudu (Le Lavandou) :

- Nom : ${name}
- Email : ${email}
- Téléphone : ${phone}
- Logement souhaité : ${prop}
- Dates souhaitées : Du ${arrival} au ${departure}
- Nombre de personnes : ${guests}

Message :
${message}

Merci d'avance pour vos disponibilités et tarifs !
Bien cordialement,
${name}`;

    return { subject: `Demande de réservation TribuDudu - ${name} (${arrival})`, body: text };
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const { subject, body } = formatInquiryText();
      const mailtoUrl = `mailto:dugailva@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const { body } = formatInquiryText();
      if (navigator.clipboard) {
        navigator.clipboard.writeText(body).then(() => {
          showToast(translations[currentLang].form_copy_success || "Texte copié dans le presse-papier !");
        });
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = body;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        showToast(translations[currentLang].form_copy_success || "Texte copié dans le presse-papier !");
      }
    });
  }

  // 6. Leaflet Interactive Map
  const mapElement = document.getElementById("map");
  if (mapElement && typeof L !== "undefined") {
    // Exact GPS coordinates of 18 Avenue du Président Auriol, 83980 Le Lavandou
    const lavandouCoords = [43.132913794713275, 6.364978816277791];
    const map = L.map("map", {
      scrollWheelZoom: false
    }).setView(lavandouCoords, 16);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
    }).addTo(map);

    const marker = L.marker(lavandouCoords).addTo(map);
    marker.bindPopup(`
      <div style="font-family: var(--font-sans); font-size: 0.85rem; line-height: 1.4; padding: 4px;">
        <strong style="color: #0f2744; font-size: 0.95rem;">TribuDudu Locations</strong><br>
        Résidence Les Horizons<br>
        18 Avenue du Président Auriol<br>
        83980 Le Lavandou<br>
        <span style="color: #c29543; font-weight: 600;">🏖️ Accès direct plage</span>
      </div>
    `).openPopup();
  }
});
