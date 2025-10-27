// Groq AI Enhancement Script
// Model: Llama 3.1 8B Instant (fast & capable for text polishing)
// ⚠️ TESTING ONLY: HARDCODED KEY BELOW. DELETE BEFORE HOSTING! Use console or backend for prod.
const MODEL = 'llama-3.1-8b-instant';
const GROQ_API_KEY = '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';  // ← REMOVE AFTER TESTING!

// NEW: Grok-style system prompt - witty pro advisor, sharp & skill-focused
const SYSTEM_PROMPT = `- You are Grok, a witty professional resume advisor built by xAI. 
- Take 1-2 raw description lines about a ${section} (e.g., internship/project/POR/skill) and transform them into resume gold: 
  - Highlight achievements, skills, and impact with action verbs (led, optimized, collaborated).
  - Keep it concise: Exactly 1-2 punchy lines per input (under 100 chars each for ATS-friendliness).
  - Add subtle wit if it fits naturally (e.g., 'turned chaos into code symphony'), but prioritize professionalism—no fluff.
  - Output ONLY the enhanced lines, separated by a single newline. No intros, no extras.`;

// FIXED: Enhanced function with better validation, single-field support, error handling
async function enhanceDescription(section) {
	let element1, element2;

	switch (section) {
		case 'internship':
			element1 = document.getElementById("interndescriptionF");
			element2 = document.getElementById("interndescription2F");
			break;
		case 'project':
			element1 = document.getElementById("projectdescriptionF");
			element2 = document.getElementById("projectdescription2F");
			break;
		case 'por':
			element1 = document.getElementById("PORdescriptionF");
			element2 = document.getElementById("PORdescription2F");
			break;
		case 'skill':
			element1 = document.getElementById("skilldescriptionF");
			element2 = element1;  // NEW: Single field for skills
			break;
		default:
			alert('Unsupported section: ' + section);  // NEW: Handle invalid sections
			return;
	}

	const description = element1.value.trim();
	const description2 = element2 && element2 !== element1 ? element2.value.trim() : '';

	// FIXED: Validate - require at least line 1; line 2 optional for single fields
	if (!description) {
		alert('Enter at least the first description line!');
		return;
	}

	// Show loading (save originals)
	const originalPlaceholder1 = element1.placeholder;
	const originalPlaceholder2 = element2 ? element2.placeholder : null;
	element1.value = '';
	if (element2) element2.value = '';
	element1.placeholder = 'Grok is sharpening your edge...';
	if (element2) element2.placeholder = 'Grok is sharpening your edge...';

	try {
		// NEW: Build user content dynamically (handles single line)
		const userContent = `Line 1: ${description}${description2 ? `\nLine 2: ${description2}` : ''}`;

		const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${GROQ_API_KEY}`  // FIXED: Use const key
			},
			body: JSON.stringify({
				messages: [
					{ role: 'system', content: SYSTEM_PROMPT.replace('${section}', section) },  // NEW: Inject section
					{ role: 'user', content: userContent }
				],
				model: MODEL,
				temperature: 0.8,  // NEW: Balanced for wit (was 1.0)
				top_p: 0.9,  // NEW: Better diversity
				stream: false,
				stop: null
			})
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(`Groq API error: ${errorData.error?.message || 'Unknown'} (Status: ${response.status})`);
		}

		const data = await response.json();
		const rawOutput = data.choices[0]?.message?.content || '';

		// FIXED: Better parsing - split/filter empty, handle 1-2 lines
		const enhancedLines = rawOutput.split('\n').map(line => line.trim()).filter(line => line);

		// Apply to fields
		if (enhancedLines[0]) element1.value = enhancedLines[0];
		if (element2 && enhancedLines[1]) element2.value = enhancedLines[1];
		else if (element2) element2.value = enhancedLines[0] || '';  // Fallback

		// NEW: Success feedback
		console.log('Grok says: "Your resume just leveled up. 💼✨"');

	} catch (error) {
		console.error('Enhancement failed:', error);
		alert(`Oops! ${error.message}\n\nTip: Check key/internet. Regenerate at console.groq.com.`);
		// FIXED: Reset fields on error
		element1.value = description;
		if (element2) element2.value = description2;
	}

	// Reset placeholders
	element1.placeholder = originalPlaceholder1;
	if (element2) element2.placeholder = originalPlaceholder2;
}

// Assign the `enhanceDescription` function to the global `window` object so that it can be called from the HTML.
window.enhanceDescription = enhanceDescription;