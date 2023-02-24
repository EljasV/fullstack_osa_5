const addABlog = (i) => {
	cy.get(":nth-child(4) > :nth-child(1) > button").click()

	const blog = { title: `A Title${i}`, author: `An Author${i}`, url: `An Url${i}` }
	cy.get("[data-testid=\"TitleInput\"]").type(blog.title)
	cy.get("[data-testid=\"AuthorInput\"]").type(blog.author)
	cy.get("[data-testid=\"UrlInput\"]").type(blog.url)
	cy.get("[style=\"\"] > form > button").click()
}

const login1 = () => {
	cy.get(":nth-child(1) > input").type("asdfg")
	cy.get(":nth-child(2) > input").type("aaaaa")
	cy.get("button").click()
}
const login2 = () => {
	cy.get(":nth-child(1) > input").type("qwerty")
	cy.get(":nth-child(2) > input").type("bbbbb")
	cy.get("button").click()
}


describe("Blog app", function () {
	let user = null
	beforeEach(function () {
		cy.request("POST", "http://localhost:3003/api/testing/reset")
		cy.request("POST", "http://localhost:3003/api/users", { username: "asdfg", name: "Asdfg", password: "aaaaa" })
		cy.request("POST", "http://localhost:3003/api/users", { username: "qwerty", name: "Qwerty", password: "bbbbb" })
		cy.visit("http://localhost:3000")
	})

	it("Login form is shown", function () {
		cy.get("#loginForm")
	})

	describe("Login", function () {
		it("succeeds with correct credentials", function () {
			cy.get(":nth-child(1) > input").type("asdfg")
			cy.get(":nth-child(2) > input").type("aaaaa")
			cy.get("button").click()
			cy.contains("Logged in successfully")
		})

		it("fails with wrong credentials", function () {
			cy.get(":nth-child(1) > input").type("asdfg")
			cy.get(":nth-child(2) > input").type("aaaaaDDD")
			cy.get("button").click()
			cy.contains("wrong credentials")
		})

		it("A blog can be created", function () {
			login1()

			cy.get(":nth-child(4) > :nth-child(1) > button").click()

			const blog = { title: "A Title", author: "An Author", url: "An Url" }
			cy.get("[data-testid=\"TitleInput\"]").type(blog.title)
			cy.get("[data-testid=\"AuthorInput\"]").type(blog.author)
			cy.get("[data-testid=\"UrlInput\"]").type(blog.url)
			cy.get("[style=\"\"] > form > button").click()
			cy.contains("A Title An Author")
		})
	})

	it("Like a blog", () => {
		login1()
		addABlog(1)
		cy.get("[style=\"padding-top: 10px; padding-left: 2px; border: 1px solid; margin-bottom: 5px;\"] > button").click()
		cy.get("[style=\"padding-top: 10px; padding-left: 2px; border: 1px solid; margin-bottom: 5px;\"] > :nth-child(4) > button").click()
		cy.contains("likes 1")
	})

	it("Delete a blog", () => {
		login1()
		addABlog(1)
		cy.get("[style=\"padding-top: 10px; padding-left: 2px; border: 1px solid; margin-bottom: 5px;\"] > button").click()
		cy.get("[style=\"padding-top: 10px; padding-left: 2px; border: 1px solid; margin-bottom: 5px;\"] > :nth-child(6)").click()
		cy.contains("Blog removed")
		cy.contains("A Title1 An Author1").should("not.exist")
	})

	it("Delete button visible only to adder", () => {
		login1()
		addABlog(1)
		cy.get("#logoutButton").click()
		login2()
		cy.get("[style=\"padding-top: 10px; padding-left: 2px; border: 1px solid; margin-bottom: 5px;\"] > button").click()
		cy.contains("remove").should("not.exist")
	})

	it.only("Sorted by likes", () => {
		login1()
		for (let i = 0; i < 5; i++) {
			addABlog(i)
		}

		for (let i = 4; i <= 8; i++) {
			//cy.get(`:nth-child(${i}) > button`).click()
			cy.get(".blog").eq(i - 4).children().contains("view").click()
			for (let j = 0; j < i; j++) {
				cy.get(".blog").children().contains(`A Title${i - 4} An Author${i - 4}`).parent().children().contains("Like").click()
				cy.wait(100)
			}
		}

		for (let i = 0; i < 5; i++) {
			cy.get(".blog").eq(i).children().contains(`A Title${4 - i} An Author${4 - i}`)
		}
	})

})