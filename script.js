let interviewList = [];
let rejectedList = [];
let currentFilter = 'all-filter-btn';

let totalDisplay = document.getElementById('totalCount');
let interviewDisplay = document.getElementById('interviewCount');
let rejectedDisplay = document.getElementById('rejectedCount');
let jobTally = document.getElementById('jobTally');

const allBtn = document.getElementById('all-filter-btn');
const interviewBtn = document.getElementById('interview-filter-btn');
const rejectedBtn = document.getElementById('rejected-filter-btn');

const allCardSection = document.getElementById('allCards');
const mainContainer = document.querySelector('main');
const filterSection = document.getElementById('filtered-section');

function calculateCount() {
    const totalJobs = allCardSection.children.length;
    totalDisplay.innerText = totalJobs;
    interviewDisplay.innerText = interviewList.length;
    rejectedDisplay.innerText = rejectedList.length;
    

    if (currentFilter === 'all-filter-btn') {
        jobTally.innerText = totalJobs;
    } else if (currentFilter === 'interview-filter-btn') {
        jobTally.innerText = interviewList.length;
    } else {
        jobTally.innerText = rejectedList.length;
    }
}

calculateCount();

function toggleStyle(id) {
    [allBtn, interviewBtn, rejectedBtn].forEach(btn => {
        btn.className = "btn-inactive text-[12px] font-medium px-4 py-1.5 rounded";
    });

    const selected = document.getElementById(id);
    currentFilter = id;
    selected.className = "btn-active text-[12px] font-medium px-4 py-1.5 rounded";

    if (id === 'interview-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderInterview();
    } else if (id === 'all-filter-btn') {
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden');
    } else if (id === 'rejected-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderRejected();
    }
    calculateCount();
}

mainContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('interview-btn')) {
        const card = event.target.closest('.job-card');
        const data = extractData(card);
        
        if (!interviewList.find(i => i.company === data.company)) {
            interviewList.push(data);
        }
        rejectedList = rejectedList.filter(i => i.company !== data.company);
        
        if (currentFilter === 'rejected-filter-btn') renderRejected();
        calculateCount();

    } else if (event.target.classList.contains('rejected-btn')) {
        const card = event.target.closest('.job-card');
        const data = extractData(card);
        
        if (!rejectedList.find(i => i.company === data.company)) {
            rejectedList.push(data);
        }
        interviewList = interviewList.filter(i => i.company !== data.company);

        if (currentFilter === 'interview-filter-btn') renderInterview();
        calculateCount();

    } else if (event.target.classList.contains('delete-btn')) {
        const card = event.target.closest('.job-card');
        const company = card.querySelector('.companyName').innerText;
        card.remove();
        interviewList = interviewList.filter(i => i.company !== company);
        rejectedList = rejectedList.filter(i => i.company !== company);
        
        if (currentFilter === 'interview-filter-btn') renderInterview();
        if (currentFilter === 'rejected-filter-btn') renderRejected();
        calculateCount();
    }
});

function extractData(card) {
    return {
        company: card.querySelector('.companyName').innerText,
        title: card.querySelector('.jobTitle').innerText,
        details: card.querySelector('.details').innerText,
        desc: card.querySelector('.jobDesc').innerText
    };
}

function renderInterview() {
    filterSection.innerHTML = '';
    interviewList.forEach(item => filterSection.appendChild(createCard(item, 'Interview', '#10B981')));
}

function renderRejected() {
    filterSection.innerHTML = '';
    rejectedList.forEach(item => filterSection.appendChild(createCard(item, 'Rejected', '#EF4444')));
}

function createCard(data, status, color) {
    const div = document.createElement('div');
    div.className = 'job-card flex justify-between bg-white p-8 rounded border border-[#E2E8F0]';
    div.innerHTML = `
        <div class="space-y-4">
            <div><p class="companyName text-[18px] font-semibold text-navy">${data.company}</p><p class="jobTitle text-[16px] text-light-slate">${data.title}</p></div>
            <p class="details text-[16px] text-light-slate">${data.details}</p>
            <button class="bg-[#EEF4FF] text-[#002C5C] text-[14px] font-semibold px-3 py-2 rounded uppercase">${status}</button>
            <p class="jobDesc text-[16px] text-light-slate max-w-2xl">${data.desc}</p>
            <div class="flex gap-3">
                <button class="interview-btn border border-[#10B981] text-[#10B981] px-4 py-1 text-[12px] font-bold uppercase rounded">Interview</button>
                <button class="rejected-btn border border-[#EF4444] text-[#EF4444] px-4 py-1 text-[12px] font-bold uppercase rounded">Rejected</button>
            </div>
        </div>
        <button class="delete-btn text-[#64748B]">✕</button>`;
    return div;
}