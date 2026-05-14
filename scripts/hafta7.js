// ========================================
// Hafta 7 - JavaScript Etkileşimleri
// 1) Tema Değiştirme
// 2) Form Verilerinden Özet Üretme
// ========================================

// ========== 1) TEMA DEĞİŞTİRME ==========
const temaButonu = document.getElementById("temaButonu");

temaButonu.addEventListener("click", function () {
    document.body.classList.toggle("dark-tema");

    if (document.body.classList.contains("dark-tema")) {
        temaButonu.textContent = "Açık Temaya Geç";
        temaButonu.classList.remove("btn-outline-dark");
        temaButonu.classList.add("btn-outline-light");
    } else {
        temaButonu.textContent = "Koyu Temaya Geç";
        temaButonu.classList.remove("btn-outline-light");
        temaButonu.classList.add("btn-outline-dark");
    }
});


// ========== 2) FORM GÖNDERİMİ & ÖZET ÜRETİMİ ==========
const kayitFormu = document.getElementById("kayitFormu");
const sonucKarti = document.getElementById("sonucKarti");

kayitFormu.addEventListener("submit", function (event) {
    // Sayfa yenilenmesini engelle
    event.preventDefault();

    // Önceki uyarıları temizle
    document.querySelectorAll(".uyari-mesaji").forEach(function (el) {
        el.remove();
    });

    // Form değerlerini al
    const adSoyad = document.getElementById("adSoyad").value.trim();
    const eposta = document.getElementById("eposta").value.trim();
    const bolum = document.getElementById("bolum").value.trim();
    const sinif = document.getElementById("sinif").value;
    const oturum = document.getElementById("oturum").value;
    const katilimTuru = document.getElementById("katilimTuru").value;
    const mesaj = document.getElementById("mesaj").value.trim();
    const onayKutusu = document.getElementById("onayKutusu").checked;

    // ===== ALAN KONTROL (Validation) =====
    let hatalar = false;

    if (!adSoyad) {
        uyariGoster("adSoyad", "Ad Soyad alanı zorunludur.");
        hatalar = true;
    }

    if (!eposta) {
        uyariGoster("eposta", "E-posta alanı zorunludur.");
        hatalar = true;
    } else if (!eposta.includes("@")) {
        uyariGoster("eposta", "Geçerli bir e-posta adresi giriniz.");
        hatalar = true;
    }

    if (!bolum) {
        uyariGoster("bolum", "Bölüm alanı zorunludur.");
        hatalar = true;
    }

    if (!sinif) {
        uyariGoster("sinif", "Lütfen sınıfınızı seçiniz.");
        hatalar = true;
    }

    if (!oturum) {
        uyariGoster("oturum", "Lütfen bir oturum seçiniz.");
        hatalar = true;
    }

    if (!katilimTuru) {
        uyariGoster("katilimTuru", "Lütfen katılım türünü seçiniz.");
        hatalar = true;
    }

    if (!onayKutusu) {
        uyariGoster("onayKutusu", "Onay kutusunu işaretlemelisiniz.");
        hatalar = true;
    }

    // Hata varsa dur
    if (hatalar) {
        return;
    }

    // ===== BAŞARILI DURUM: ÖZET KARTI OLUŞTUR =====
    const mesajMetni = mesaj ? mesaj : "—";

    sonucKarti.className = "sonuc-dolu rounded-4 p-4";
    sonucKarti.innerHTML = 
        '<div class="text-center mb-4">' +
            '<div class="display-4">✅</div>' +
            '<h4 class="fw-bold text-success mt-2">Başvuru Özeti Oluşturuldu!</h4>' +
        '</div>' +
        '<table class="table table-borderless">' +
            '<tr><td><strong>Ad Soyad</strong></td><td>' + adSoyad + '</td></tr>' +
            '<tr><td><strong>E-posta</strong></td><td>' + eposta + '</td></tr>' +
            '<tr><td><strong>Bölüm</strong></td><td>' + bolum + '</td></tr>' +
            '<tr><td><strong>Sınıf</strong></td><td>' + sinif + '</td></tr>' +
            '<tr><td><strong>Oturum</strong></td><td>' + oturum + '</td></tr>' +
            '<tr><td><strong>Katılım Türü</strong></td><td>' + katilimTuru + '</td></tr>' +
            '<tr><td><strong>Mesaj</strong></td><td>' + mesajMetni + '</td></tr>' +
        '</table>';

    // Sonuç alanına kaydır
    document.getElementById("sonucAlani").scrollIntoView({ behavior: "smooth" });
});

// Form temizlendiğinde sonuç alanını da sıfırla
kayitFormu.addEventListener("reset", function () {
    // Uyarıları temizle
    document.querySelectorAll(".uyari-mesaji").forEach(function (el) {
        el.remove();
    });

    // Sonuç alanını varsayılan haline döndür
    sonucKarti.className = "sonuc-bos rounded-4 p-4 text-center";
    sonucKarti.innerHTML = '<p class="mb-0">Henüz başvuru özeti oluşturulmadı. Formu doldurduktan sonra sonuç burada görünecek.</p>';
});


// ===== YARDIMCI FONKSİYON: Uyarı Göster =====
function uyariGoster(elemanId, mesaj) {
    const eleman = document.getElementById(elemanId);
    const uyari = document.createElement("div");
    uyari.className = "uyari-mesaji";
    uyari.textContent = mesaj;
    eleman.parentElement.appendChild(uyari);
}
