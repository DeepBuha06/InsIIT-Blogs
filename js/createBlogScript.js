import { collection, addDoc } from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js'
import { auth, db } from './firebaseSetup.js'




const form = document.querySelector('#createBlogForm')
form.addEventListener('submit', async (event) => {
	event.preventDefault()
	if (!auth.currentUser) {
		alert('Please log in')
		return
	}


	const formData = new FormData(form)
	const title = formData.get('title')
	const subline = formData.get('subline')
	const body = formData.get('body')
	const author = auth.currentUser.displayName
	try {
		const docRef = await addDoc(collection(db, "blogs"), {
			title, subline, body, author, createdAt: new Date()
		})

		const indexRef = await addDoc(collection(db, "blogsRef"), {
			title, subline, author, blogId: docRef.id, createdAt: new Date()
		})
		
		alert('Blog created successfully!')
		window.location.href = 'index.html'

	} catch (error) {
		console.log(error)
		alert('Error creating blog. Please try again.')
	}

})

