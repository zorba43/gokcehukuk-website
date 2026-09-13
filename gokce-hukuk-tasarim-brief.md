# Gökçe Hukuk Danışmanlık — Website Yenileme Brief'i
*Claude Code ile `gokcehukuk` klasöründe geliştirme için hazırlanmıştır*

---

## 1. Proje Özeti

Gökçe Hukuk Danışmanlık'ın mevcut web sitesi (gokcehukuklaw.com), Kazabildir uygulamasının arkasındaki hukuk ofisinin kurumsal yüzü. Site komple yenilenecek: **kurumsal, premium ve şık**, ama aynı zamanda **yaratıcı ve akılda kalıcı** bir tasarıma geçilecek.

---

## 2. Teknik Altyapı Önerisi

**Önerilen: Statik modern site (HTML/CSS/JS + Tailwind CSS)**

Neden:
- Bu bir kurumsal tanıtım sitesi — dinamik veri/CMS/kullanıcı girişi gereksinimi yoksa Next.js gibi bir framework gereksiz karmaşıklık katar.
- Statik site: çok hızlı yüklenir (SEO ve Core Web Vitals için avantaj — hukuk bürolarında yerel SEO kritik).
- Barındırma basit ve ucuz (Vercel/Netlify/Cloudflare Pages statik hosting, ya da mevcut hosting).
- Claude Code ile üretimi ve bakımı kolay; [[avukat-website]] (Kazabildir) projesiyle teknoloji tutarlılığı sağlanır.

---

## 3. Tasarım Yönü — "Tematik Anlatıcılık" (Bick Law LLP ilhamlı)

**Referans:** bicklawllp.com — çevre hukuku alanında ödüllü (Webby adayı) bir bürodan uyarlanan yaklaşım. Sıradan bir "kurumsal hukuk sitesi" yerine, her mesajı **espirili bir başlık + o başlığın anlamını görselleştiren sembolik bir fotoğraf/illüstrasyon** ile anlatan bir hero slider kullanıyorlar. Bu, Gökçe Hukuk'un ana ayırt edici tasarım unsuru olacak.

Claude Code, projeye başlarken hem mevcut siteyi (gokcehukuklaw.com — içerik/hizmet/ekip bilgisi için) hem de bicklawllp.com'u (tasarım/etkileşim/hero slider mekaniği için) incelemeli.

### Renk Paleti
- **Ana renk:** Koyu zeytin yeşili (`#14351F` civarı) — Akdeniz kimliği için lacivert yerine tercih edildi
- **Vurgu rengi:** Kırık altın / bronz (`#C9A15A`) — CTA butonları, ayraç çizgiler, başlıklardaki vurgulu kelimeler
- **Nötr:** Kırık beyaz, taş grisi (`#F5F4F0`, `#8B8B8B`)

### Tipografi
- **Başlıklar (hero):** Editoryal serif (Fraunces/Playfair Display), vurgulu kelimeler italik + bronz renkte
- **Gövde metni:** Temiz sans-serif (Inter)

### Hero Slider Mekaniği
- Görseller başlangıçta yarı-monokrom, hover/scroll'da vurgu rengi belirginleşir (ince, abartısız bir geçiş)
- İlerleme göstergesi: **sol kenarda dikey nokta/çizgi dizisi** (aktif slayt = uzun bronz çizgi, pasifler = küçük yarı saydam nokta), `position:absolute; left:32px; top:50%; transform:translateY(-50%)`
- Alt ortada, yumuşak **pulse animasyonlu** ("yanıp sönen") bir aşağı kaydır göstergesi — `@keyframes pulse { 0%,100%{opacity:.3} 50%{opacity:1} }`, `animation: pulse 2s ease-in-out infinite`
- **Arka plan animasyonu:** her slaytta yavaş Ken Burns zoom (scale(1)→scale(1.08), 6-8sn) + zeminin tamamında %3-5 opaklıkta ince film grain dokusu — sinematik/premium his, performans maliyeti düşük
- Gerçek fotoğraf kullanımı esas — stok görsel yerine ofis/ekip/bölgeye ait otantik çekimler önerilir; ilk aşamada Unsplash/Pexels'ten (ücretsiz lisanslı) tematik görseller yer tutucu olarak kullanılabilir

### Slayt Görsel Yönü (sembolik, Bick Law mantığı)
| Slayt | Görsel fikri | Örnek arama terimi (Unsplash/Pexels) |
|---|---|---|
| Trafik Kazası/Kazabildir | Gece yolda uzun pozlama far/stop lambası izleri | `night road light trails` |
| Ticaret Hukuku | Kalem ucu + kağıt üzerinde imza anı, makro çekim | `pen signature macro contract` |
| Ceza Hukuku | Adliye/klasik mimari sütunlar, dramatik ışık-gölge | `courthouse columns dramatic` |
| Aile Hukuku | Zeytin ağacı — kökleri ve dalları (aile/köken metaforu) | `olive tree roots mediterranean` |
| Kazabildir/İnovasyon | Telefon ekranı bildirimi, arka planda bulanık şehir ışıkları (bokeh) | `phone notification city bokeh` |
| Genel/Deneyim | Deniz feneri veya taş/mermer bina cephesi (rehberlik/güven sembolü) | `lighthouse dramatic coast` |

*Not: Bunlar yer tutucu yönlendirmeler — Claude Code, Unsplash/Pexels üzerinden bu temalarda ücretsiz-lisanslı görseller bulup indirebilir. Nihai versiyonda gerçek ofis/ekip fotoğraflarıyla değiştirilmesi önerilir.*

### Genel His
- Sade navigasyon (5-6 madde), sticky header
- Güven unsurları: kaç yıldır hizmet, dosya/müvekkil sayısı, varsa medya/basın görünürlüğü
- Mobil öncelikli tasarım (responsive)

---

## 4. Ana Sayfa Hero Slider İçeriği (taslak metinler)

Her slayt: **başlık** (vurgulu kelime bronz/italik) + **alt metin** (tek cümle) + **görsel yönü**.

**Slayt 1 — Trafik Kazası Hukuku / Kazabildir**
- Başlık: "Kaza *anında*, dosyanız *o an* açılır."
- Alt metin: Kazabildir ile ilk dakikadan itibaren yanınızdayız.
- Görsel: Gece ışıklarıyla bir yol/kavşak, ya da elde tutulan telefonda bildirim ekranı — dramatik ama profesyonel.

**Slayt 2 — Ticaret Hukuku**
- Başlık: "Sözleşmeniz, *geleceğiniz* kadar sağlam olmalı."
- Alt metin: İlk taslaktan imzaya, kurumsal anlaşmalarda yanınızdayız.
- Görsel: Masada imzalanan bir belge, kalem/el detayı; ya da mermer doku üzerine ışık.

**Slayt 3 — Ceza Hukuku**
- Başlık: "Haklarınız, *savunulmayı* bekleyemez."
- Alt metin: Soruşturmanın ilk anından itibaren güçlü bir savunma.
- Görsel: Adliye koridoru / ahşap kapıdan sızan ışık — kelepçe/parmaklık gibi klişelerden kaçınılmalı.

**Slayt 4 — Aile Hukuku**
- Başlık: "Aile, dosyalar içindeki *en değerli* olandır."
- Alt metin: Boşanma ve velayet süreçlerinde hassasiyetle, kararlılıkla.
- Görsel: Sıcak ışıkta bir ev/pencere silüeti, ya da saygılı bir el ele detay çekimi (yüz göstermeden).

**Slayt 5 — Kazabildir / İnovasyon**
- Başlık: "Teknoloji, *adaleti* hızlandırır."
- Alt metin: Geleneksel hukuku dijital çağa taşıyan Kazabildir ile tanışın.
- Görsel: Telefon ekranında uygulama arayüzü, modern/temiz çekim.

**Slayt 6 — Genel / Deneyim**
- Başlık: "*10 yıllık* deneyim, tek hedef: haklarınız."
- Alt metin: Antalya merkezli, güvenilir hukuk danışmanlığı.
- Görsel: Ofis dış cephesi veya gerçek ekip fotoğrafı (stüdyo kalitesinde).

*Not: Bu metinler taslaktır — büronun gerçek uzmanlık alanları ve tonuna göre kesinleştirilmeli. Claude Code, mevcut siteden (gokcehukuklaw.com) gerçek hizmet bilgilerini çekip bu şablona oturtabilir.*

---

## 5. Ana Sayfanın Diğer Bölümleri (hero sonrası)

1. Kısa tanıtım + güven rozetleri (yıl, varsa basın/ödül)
2. **Ekibimiz** — fotoğraf + isim + unvan + kısa bio kart grid
3. **Uzmanlık Alanları** — sade pill/link listesi
4. **Neden Bizi Seçmeliler** — gerçek müvekkil yorumları (slider)
5. **Değer önermeleri** (accordion/kart): Deneyim, Müvekkil Odaklılık, Şeffaf Ücretlendirme, İşbirlikçi Yaklaşım, Kazabildir İnovasyonu
6. **Güncel / Görüşler** — 3 kısa haber/makale kartı
7. **İletişim CTA** + footer (logo, sosyal medya, telefon/adres)

---

## 6. Diğer Sayfalar

2. **Hakkımızda** — ofis hikayesi, misyon/vizyon, kurucu/avukat profili, ekip
3. **Hizmet Alanları** — her hizmet için ayrı bölüm/sayfa
4. **Kazabildir** — uygulamanın tanıtımı, ofisle bağlantısı
5. **Blog / Makaleler** (opsiyonel, ileride)
6. **İletişim** — adres, harita, form

---

## 7. Sonraki Adımlar (Claude Code'da)

1. `gokcehukuk` klasöründe proje iskeletini kur (index.html + Tailwind config + assets klasörü)
2. Bu brief'i referans olarak ver; gokcehukuklaw.com'u içerik için, bicklawllp.com'u tasarım/etkileşim mekaniği için incelemesini iste
3. Önce ana sayfa hero slider'ı kur, onay al, sonra diğer bölüm ve sayfalara geç
4. Görsel varlıklar (logo, fotoğraflar) varsa klasöre ekle
5. SEO temel ayarları (meta title/description, sitemap) son adımda eklenir

---

*Bu brief, Claude Code'a proje başlangıcında referans olarak verilebilir.*
