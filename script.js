
document.addEventListener("DOMContentLoaded", function () {

    // GET HTML ELEMENTS
    const sidebar = document.getElementById("sidebar");
    const collapseBtn = document.getElementById("collapseBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    const searchInput = document.getElementById("searchInput");
    const timeframe = document.getElementById("timeframe");
    const currentView = document.getElementById("currentView");

    const modalOverlay = document.getElementById("modalOverlay");
    const modalTitle = document.getElementById("modalTitle");
    const modalBody = document.getElementById("modalBody");
    const closeModal = document.getElementById("closeModal");

    // OPEN POPUP
    function openModal(title, content) {
        modalTitle.textContent = title;
        modalBody.innerHTML = content;
        modalOverlay.classList.add("show");
    }

    // CLOSE POPUP
    function hideModal() {
        modalOverlay.classList.remove("show");
    }

    closeModal.addEventListener("click", hideModal);

    modalOverlay.addEventListener("click", function (event) {
        if (event.target === modalOverlay) {
            hideModal();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            hideModal();
            sidebar.classList.remove("mobile-open");
        }
    });

    // COLLAPSE SIDEBAR
    collapseBtn.addEventListener("click", function () {
        if (window.innerWidth > 650) {
            sidebar.classList.toggle("collapsed");
        } else {
            sidebar.classList.remove("mobile-open");
        }
    });

    // MOBILE SIDEBAR
    mobileMenu.addEventListener("click", function () {
        sidebar.classList.toggle("mobile-open");
    });

    // CLOSE MOBILE SIDEBAR AFTER CLICKING A LINK
    document.querySelectorAll(".menu-item").forEach(function (item) {
        item.addEventListener("click", function () {
            document.querySelectorAll(".menu-item").forEach(function (link) {
                link.classList.remove("active");
            });

            item.classList.add("active");
            sidebar.classList.remove("mobile-open");
        });
    });

    // TIMEFRAME SELECTOR
    timeframe.addEventListener("change", function () {
        const selectedText =
            timeframe.options[timeframe.selectedIndex].text;

        currentView.textContent = "Currently viewing: " + selectedText;

        openModal(
            "Timeframe Selected",
            "<p>You selected <strong>" +
            selectedText +
            "</strong>.</p>" +
            "<p>This demo changes the selected timeframe label. " +
            "To load different financial-year figures, connect the dashboard " +
            "to your project data.</p>"
        );
    });

    // SEARCH DEPARTMENTS IN THE TABLE
    searchInput.addEventListener("input", function () {
        const searchText = searchInput.value.toLowerCase().trim();

        const rows = document.querySelectorAll(
            "#departmentTable tr"
        );

        let visibleRows = 0;

        rows.forEach(function (row) {
            const rowText = row.textContent.toLowerCase();
            const matches = rowText.includes(searchText);

            row.style.display = matches ? "" : "none";

            if (matches) {
                visibleRows++;
            }
        });

        document.getElementById("resultCount").textContent =
            visibleRows + (visibleRows === 1
                ? " department"
                : " departments");
    });

    // ADD PROJECT FORM
    function showAddProjectForm() {
        openModal(
            "Add New Project",
            `
            <form class="modal-form" id="projectForm">

                <label for="projectName">Project Name</label>
                <input id="projectName" name="projectName"
                       type="text" placeholder="Enter project name"
                       required>

                <label for="projectDepartment">Department</label>
                <select id="projectDepartment" name="department" required>
                    <option value="">Select Department</option>
                    <option>Health Services and Sanitation</option>
                    <option>Water and Environment</option>
                    <option>Education</option>
                    <option>Roads and Infrastructure</option>
                </select>

                <label for="projectBudget">Budget (KES)</label>
                <input id="projectBudget" name="budget"
                       type="number" min="0"
                       placeholder="Enter budget" required>

                <label for="projectStatus">Project Status</label>
                <select id="projectStatus" name="status">
                    <option>Not Started</option>
                    <option>Ongoing</option>
                    <option>Completed</option>
                    <option>Stalled</option>
                    <option>Procurement</option>
                </select>

                <button type="submit">Submit Project</button>

            </form>
            `
        );

        document.getElementById("projectForm").addEventListener(
            "submit",
            function (event) {
                event.preventDefault();

                const name =
                    document.getElementById("projectName").value.trim();

                openModal(
                    "Project Form Submitted",
                    "<p><strong>" + escapeHTML(name) +
                    "</strong> was entered successfully in this demo.</p>" +
                    "<p>The project is not saved permanently. " +
                    "A database or backend is needed to store project records.</p>"
                );
            }
        );
    }

    // SAFELY DISPLAY USER TEXT IN HTML
    function escapeHTML(value) {
        return value.replace(/[&<>"']/g, function (character) {
            const replacements = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            };

            return replacements[character];
        });
    }

    document.getElementById("addProjectBtn").addEventListener(
        "click", showAddProjectForm
    );

    document.getElementById("headerAdd").addEventListener(
        "click", showAddProjectForm
    );

    document.getElementById("addProjectSide").addEventListener(
        "click", showAddProjectForm
    );

    // VIEW ALL PROJECTS
    document.getElementById("viewProjectsBtn").addEventListener(
        "click",
        function () {
            openModal(
                "All Projects",
                "<p>Total Projects: <strong>13</strong></p>" +
                "<p>Completed: 7 | Ongoing: 2 | Stalled: 1</p>" +
                "<p>This dashboard uses sample figures. " +
                "A complete project list requires project records.</p>"
            );
        }
    );

    // FEEDBACK
    function showFeedback() {
        openModal(
            "Project Feedback",
            `
            <form class="modal-form" id="feedbackForm">

                <label for="feedbackName">Your Name</label>
                <input id="feedbackName" type="text"
                       placeholder="Enter your name" required>

                <label for="feedbackMessage">Feedback</label>
                <textarea id="feedbackMessage"
                          placeholder="Write your feedback"
                          rows="4" required></textarea>

                <button type="submit">Submit Feedback</button>

            </form>
            `
        );

        document.getElementById("feedbackForm").addEventListener(
            "submit",
            function (event) {
                event.preventDefault();

                openModal(
                    "Feedback Submitted",
                    "<p>Your feedback has been entered in this demo.</p>" +
                    "<p>To save feedback permanently, connect a backend.</p>"
                );
            }
        );
    }

    document.getElementById("feedbackBtn").addEventListener(
        "click", showFeedback
    );

    document.getElementById("feedbackSide").addEventListener(
        "click", showFeedback
    );

    // PROJECT STATUS DETAILS
    document.querySelectorAll(".details-btn").forEach(function (button) {
        button.addEventListener("click", function () {
            const status = button.dataset.status;
            const number = button.closest(".status-card")
                                .querySelector("h2").textContent;

            openModal(
                status + " Projects",
                "<p>Number of " + escapeHTML(status.toLowerCase()) +
                " projects: <strong>" + escapeHTML(number) +
                "</strong></p>" +
                "<p>Detailed project records can be displayed here " +
                "when project data is connected.</p>"
            );
        });
    });

    // FILTER BY LOCATION OR DEPARTMENT
    document.getElementById("filterBtn").addEventListener(
        "click",
        function () {
            openModal(
                "Filter Projects",
                `
                <form class="modal-form" id="filterForm">

                    <label for="locationFilter">Location</label>
                    <select id="locationFilter">
                        <option value="">All Locations</option>
                        <option>Kitale</option>
                        <option>Kiminini</option>
                        <option>Endebess</option>
                        <option>Saboti</option>
                    </select>

                    <label for="departmentFilter">Department</label>
                    <select id="departmentFilter">
                        <option value="">All Departments</option>
                        <option>Health Services and Sanitation</option>
                        <option>Water and Environment</option>
                        <option>Education</option>
                        <option>Roads and Infrastructure</option>
                    </select>

                    <button type="submit">Apply Filter</button>

                </form>
                `
            );

            document.getElementById("filterForm").addEventListener(
                "submit",
                function (event) {
                    event.preventDefault();

                    const department =
                        document.getElementById("departmentFilter").value;

                    const rows = document.querySelectorAll(
                        "#departmentTable tr"
                    );

                    let visibleRows = 0;

                    rows.forEach(function (row) {
                        const matches = !department ||
                            row.textContent.toLowerCase()
                                .includes(department.toLowerCase());

                        row.style.display = matches ? "" : "none";

                        if (matches) visibleRows++;
                    });

                    document.getElementById("resultCount").textContent =
                        visibleRows + " departments";

                    searchInput.value = "";
                    hideModal();
                }
            );
        }
    );

    // REPORTS
    document.getElementById("reportsSide").addEventListener(
        "click",
        function () {
            openModal(
                "Reports",
                "<p><strong>Total Projects:</strong> 13</p>" +
                "<p><strong>Total Budget:</strong> KES 62,191,416</p>" +
                "<p><strong>Total Expenditure:</strong> KES 27,081,056</p>" +
                "<p>These are example report figures from the dashboard.</p>"
            );
        }
    );

    // HEADER SHORTCUTS
    document.getElementById("cloudBtn").addEventListener(
        "click",
        function () {
            openModal(
                "Cloud Status",
                "<p>This demo does not have cloud storage connected.</p>"
            );
        }
    );

    document.getElementById("notificationBtn").addEventListener(
        "click",
        function () {
            openModal(
                "Notifications",
                "<p>You have sample dashboard notifications.</p>"
            );
        }
    );

    document.getElementById("historyBtn").addEventListener(
        "click",
        function () {
            openModal(
                "Recent Activity",
                "<p>Recent dashboard activity will appear here.</p>"
            );
        }
    );

    document.getElementById("messagesBtn").addEventListener(
        "click", showFeedback
    );

    document.getElementById("accountBtn").addEventListener(
        "click",
        function () {
            openModal(
                "User Profile",
                "<p><strong>Mutai Kipkemboi</strong></p>" +
                "<p>Role: Executive</p>"
            );
        }
    );

});
