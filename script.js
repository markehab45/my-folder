// =========================================================
// مريومة ❤️ — Love Page Script
// =========================================================

/* ---------- عناصر الصفحة ---------- */
const loadingScreen = document.getElementById("loadingScreen");
const welcome = document.getElementById("welcome");
const passwordPage = document.getElementById("passwordPage");
const home = document.getElementById("home");

const startBtn = document.getElementById("startBtn");
const loginBtn = document.getElementById("loginBtn");
const password = document.getElementById("password");
const error = document.getElementById("error");

const typing = document.getElementById("typing");
const music = document.getElementById("music");

/* ---------- شاشة التحميل ---------- */
window.addEventListener("load", () => {
    setTimeout(() => {
        loadingScreen.style.opacity = "0";
        setTimeout(() => {
            loadingScreen.style.display = "none";
            welcome.classList.remove("hide");
        }, 900);
    }, 2600);
});

/* ---------- الانتقال لصفحة الباسورد ---------- */
startBtn.onclick = () => {
    welcome.classList.add("hide");
    passwordPage.classList.remove("hide");
};

/* ---------- تسجيل الدخول ---------- */
const validAnswers = ["2/7/2005", "2-7-2005", "02/07/2005", "2 7 2005", "2792005"];

loginBtn.onclick = () => attemptLogin();
password.addEventListener("keyup", (e) => { if (e.key === "Enter") attemptLogin(); });

function attemptLogin(){
    const val = password.value.trim().replace(/\s+/g, " ");
    if (validAnswers.includes(val)) {
        passwordPage.classList.add("hide");
        home.classList.remove("hide");
        music.play().catch(() => {});
        typeWriter();
        buildGallery();
        startCounter();
    } else {
        error.innerHTML = "❌ لأ يا مريومة، فكري تاني... اليوم اللي اتولدتي فيه";
        password.style.border = "2px solid #ff4d6d";
        setTimeout(() => { password.style.border = "1px solid rgba(255,255,255,.14)"; }, 650);
    }
}

/* ---------- الكتابة حرف حرف ---------- */
const introText =
`في يوم زي النهاردة، من كتير سنين، اتولدت بنت مكنتش أعرفها وقتها...
لكن ربنا كان مخبيلي إياها علشان تبقى أحلى حاجة حصلتلي في حياتي.

مريم، انتي مش مجرد حبيبتي... انتي البيت اللي بيرجعله قلبي كل ما يتعب.
انتي الابتسامة اللي بتخليني أنسى أي يوم وحش، وانتي السبب اللي بيخليني أشكر ربنا كل يوم.

النهاردة عيد ميلادك، وأنا عايز الدنيا كلها توقف ثانية وتحتفل بيكي زي ما انا بحتفل بيكي كل يوم.

كل سنة وانتي طيبة يا أجمل بنت في الدنيا.
كل سنة وانتي أغلى حاجة عندي.
كل سنة وقلبي بيحبك أكتر من اللي فاتت.`;

let ti = 0;
function typeWriter(){
    if (ti < introText.length){
        typing.innerHTML += introText.charAt(ti) === "\n" ? "<br>" : introText.charAt(ti);
        ti++;
        setTimeout(typeWriter, 28);
    }
}

/* =========================================================
   الجاليري — صور كاملة بدون أي قص
========================================================= */
const photos = [
    { src:"images/1.jpg",  caption:"❤️ أول صورة وقعت فيها في حبك" },
    { src:"images/3.jpg",  caption:"🌹 أجمل بنت شافتها عيني" },
    { src:"images/4.jpg",  caption:"🥷 يوم كنا مجرمين شقاوة بس" },
    { src:"images/5.jpg",  caption:"🌴 لحظة ما الدنيا وقفت لينا بس" },
    { src:"images/6.jpg",  caption:"💛 يوم كنا مبسوطين من غير أي سبب" },
    { src:"images/7.jpg",  caption:"😄 كواليس ضحكنا اللي محدش شافها" },
    { src:"images/8.jpg",  caption:"🌤️ نور الشمس مش زي نورك" },
    { src:"images/9.jpg",  caption:"🌳 يوم من أحلى أيامنا سوا" },
    { src:"images/10.jpg", caption:"🎬 ليلة السينما وقلوبنا بتتكلم" },
    { src:"images/11.jpg", caption:"💫 كل تفصيلة فيكي بحبها" }
];

function buildGallery(){
    const track = document.getElementById("galleryTrack");
    const dotsWrap = document.getElementById("galleryDots");
    if (!track || track.childElementCount) return;

    photos.forEach((p, idx) => {
        const card = document.createElement("div");
        card.className = "polaroid";
        card.innerHTML = `
            <div class="polaroidFrame">
                <img src="${p.src}" alt="ذكرى ${idx+1}" loading="lazy">
            </div>
            <div class="polaroidCaption">${p.caption}</div>
        `;
        track.appendChild(card);

        const dot = document.createElement("span");
        dot.className = "gdot" + (idx === 0 ? " active" : "");
        dotsWrap.appendChild(dot);
    });

    const dots = dotsWrap.querySelectorAll(".gdot");
    track.addEventListener("scroll", () => {
        const cardWidth = track.firstElementChild.getBoundingClientRect().width + 26;
        const idx = Math.round(track.scrollLeft / cardWidth);
        dots.forEach((d,i) => d.classList.toggle("active", i === idx));
    });
}

/* =========================================================
   عداد الحب
========================================================= */
const startDate = new Date("2024-02-13T00:00:00");
let counterInterval;

function startCounter(){
    if (counterInterval) return;
    counterInterval = setInterval(() => {
        const now = new Date();
        const diff = now - startDate;

        const days = Math.floor(diff/(1000*60*60*24));
        const hours = Math.floor(diff/(1000*60*60))%24;
        const minutes = Math.floor(diff/(1000*60))%60;
        const seconds = Math.floor(diff/1000)%60;

        document.getElementById("counter").innerHTML = `
            <div class="counterBox"><b>${days}</b><span>يوم</span></div>
            <div class="counterBox"><b>${hours}</b><span>ساعة</span></div>
            <div class="counterBox"><b>${minutes}</b><span>دقيقة</span></div>
            <div class="counterBox"><b>${seconds}</b><span>ثانية</span></div>
        `;
    }, 1000);
}

/* =========================================================
   القلوب الطايرة
========================================================= */
setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "❤";
    heart.style.left = Math.random()*100 + "%";
    heart.style.color = Math.random() > .5 ? "#ff6f9c" : "#e8b86d";
    heart.style.fontSize = (16 + Math.random()*22) + "px";
    heart.style.animationDuration = (6 + Math.random()*6) + "s";
    document.getElementById("hearts").appendChild(heart);
    setTimeout(() => heart.remove(), 13000);
}, 420);

/* =========================================================
   خلفية النجوم المتحركة (Canvas)
========================================================= */
const canvas = document.getElementById("skyCanvas");
const ctx = canvas.getContext("2d");
let stars = [];

function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = Array.from({length: 140}, () => ({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        r: Math.random()*1.6 + .3,
        speed: Math.random()*.25 + .05,
        alpha: Math.random()
    }));
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function animateStars(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    stars.forEach(s => {
        s.alpha += (Math.random()-.5) * .03;
        s.alpha = Math.max(.1, Math.min(1, s.alpha));
        s.y += s.speed;
        if (s.y > canvas.height) s.y = 0;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(255,240,245,${s.alpha})`;
        ctx.fill();
    });
    requestAnimationFrame(animateStars);
}
animateStars();

/* =========================================================
   الرسالة — فتح الظرف
========================================================= */
const envelope = document.getElementById("envelope");
const letterPaper = document.getElementById("letterPaper");

const letter = `إلى أجمل بنت في الدنيا... مريومة ❤️

كل سنة وانتي طيبة يا روحي، ويا أغلى حاجة عندي في الحياة دي.

مش عارف أبدأ منين، لأن كل مرة بحاول أوصف حبي ليكي بحس إن الكلام مش كفاية.
بس هحاول... علشان تفتكري كل ما تفتحي الصفحة دي إن في حد بيحبك أوي أوي.

من يوم 13 فبراير 2024، حياتي اتقسمت لجزئين: قبلك وبعدك.
وأنا مبسوط إني عايش في الجزء اللي فيه انتي.

كل يوم معاكي بيعلمني حاجة جديدة عن الحب، عن الصبر، وعن إني أكون أحسن نسخة مني علشانك.
ضحكتك بقت أحلى صوت بسمعه، وخبطتك على الباب بقت أحلى لحظة في يومي.

أول خروجة ليك يوم 5 مايو، لسه فاكرها زي إمبارح.
كل تفصيلة فيها، من أول كلمة اتقالت لحد آخر ثانية قبل ما نتفرق، محفورة في دماغي.

بحب طريقتك في الكلام، بحب عنادك اللطيف، وبحب إنك بتحاولي تخبي مشاعرك وانتي مش عارفة تعملي كدا خالص.
بحب إنك بتفكري في التفاصيل الصغيرة اللي محدش بيلاحظها غيرك.
بحب كل حاجة فيكي، حتى العيوب اللي انتي شايفاها عيوب وأنا شايفها جزء من اللي بحبه فيكي.

وجودك في حياتي مش صدفة، أنا متأكد إن ربنا حطك في طريقي علشان يعلمني معنى الحب الحقيقي.
ولو خيروني ألف مرة، هختارك انتي، في كل مرة، من غير تفكير.

يا مريومة، انتي مش حبيبتي بس، انتي أهم حد في حياتي، وحلمي إني فضل جنبك لأطول وقت ممكن.
عايزك تكوني سعيدة، عايزك تضحكي دايمًا، وعايزك تعرفي إن مهما حصل، هتلاقيني جنبك.

كل سنة وانتي بخير يا أجمل بنت في الدنيا.
وربنا يخليكي ليا، ويخلي أيامك كلها فرح وضحك وراحة بال.

بحبك جدًا... وبموت فيكي.

- ماركو ❤️`;

envelope.addEventListener("click", () => {
    envelope.classList.add("open");
    setTimeout(() => {
        letterPaper.classList.remove("hide");
        document.getElementById("letterText").innerText = letter;
        letterPaper.scrollIntoView({behavior:"smooth", block:"center"});
    }, 500);
}, { once:true });

/* =========================================================
   التورتة — إطفاء الشموع
========================================================= */
const cakeBtn = document.getElementById("cakeBtn");
const cakeEl = document.querySelector(".cake");
const finalEl = document.getElementById("final");

cakeBtn.onclick = () => {
    cakeEl.classList.add("blown");
    cakeBtn.disabled = true;
    cakeBtn.style.opacity = ".6";
    cakeBtn.innerText = "🕯️ اتمنى بقلبك...";

    fireworks();

    setTimeout(() => {
        finalEl.style.display = "block";
        finalEl.scrollIntoView({behavior:"smooth", block:"start"});
    }, 900);
};

/* =========================================================
   ألعاب نارية
========================================================= */
function fireworks(){
    for (let i=0; i<160; i++){
        const star = document.createElement("div");
        star.style.position = "fixed";
        star.style.width = "8px";
        star.style.height = "8px";
        star.style.borderRadius = "50%";
        star.style.left = Math.random()*100 + "vw";
        star.style.top = Math.random()*100 + "vh";
        star.style.background = `hsl(${Math.random()*360},100%,65%)`;
        star.style.boxShadow = "0 0 15px white";
        star.style.zIndex = "9999";
        star.style.pointerEvents = "none";
        document.body.appendChild(star);

        star.animate([
            { transform:"scale(0)", opacity:1 },
            { transform:"scale(3)", opacity:0 }
        ], { duration:1600, easing:"ease-out" });

        setTimeout(() => star.remove(), 1600);
    }
}
