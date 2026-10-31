import os
import pptx
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

def build_round2_presentation():
    prs = pptx.Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # Theme Colors
    BG_DARK = RGBColor(5, 8, 17)          # #050811 Deep Night
    CARD_BG = RGBColor(12, 21, 39)        # #0C1527 Card Dark
    ACCENT_CYAN = RGBColor(6, 182, 212)   # #06B6D4 Cyan
    ACCENT_TEAL = RGBColor(20, 184, 166)  # #14B8A6 Teal
    ACCENT_GREEN = RGBColor(16, 185, 129) # #10B981 Emerald
    ACCENT_AMBER = RGBColor(245, 158, 11) # #F59E0B Amber
    ACCENT_ROSE = RGBColor(244, 63, 94)   # #F43F5E Rose
    TEXT_WHITE = RGBColor(248, 250, 252)  # #F8FAFC
    TEXT_MUTED = RGBColor(148, 163, 184)  # #94A3B8
    TEXT_BODY = RGBColor(226, 232, 240)   # #E2E8F0
    BORDER_COLOR = RGBColor(30, 41, 59)   # #1E293B

    def set_slide_background(slide, color=BG_DARK):
        bg_shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
        bg_shape.fill.solid()
        bg_shape.fill.fore_color.rgb = color
        bg_shape.line.fill.background()

    def add_header(slide, category, title, subtitle):
        # Category pill
        pill = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(0.4), Inches(3.2), Inches(0.32))
        pill.fill.solid()
        pill.fill.fore_color.rgb = RGBColor(15, 30, 50)
        pill.line.color.rgb = ACCENT_CYAN
        pill.line.width = Pt(1)
        tf_pill = pill.text_frame
        tf_pill.word_wrap = True
        tf_pill.vertical_anchor = MSO_ANCHOR.MIDDLE
        p0 = tf_pill.paragraphs[0]
        p0.alignment = PP_ALIGN.CENTER
        run = p0.add_run()
        run.text = f"VAYUVISION AI  |  {category.upper()}"
        run.font.size = Pt(10)
        run.font.bold = True
        run.font.color.rgb = ACCENT_CYAN

        # Title
        tb_title = slide.shapes.add_textbox(Inches(0.8), Inches(0.78), Inches(11.7), Inches(0.55))
        tf_title = tb_title.text_frame
        tf_title.word_wrap = True
        p_title = tf_title.paragraphs[0]
        run_t = p_title.add_run()
        run_t.text = title
        run_t.font.size = Pt(22)
        run_t.font.bold = True
        run_t.font.color.rgb = TEXT_WHITE

        # Subtitle
        tb_sub = slide.shapes.add_textbox(Inches(0.8), Inches(1.3), Inches(11.7), Inches(0.35))
        tf_sub = tb_sub.text_frame
        p_sub = tf_sub.paragraphs[0]
        run_s = p_sub.add_run()
        run_s.text = subtitle
        run_s.font.size = Pt(12)
        run_s.font.color.rgb = TEXT_MUTED

    # =========================================================
    # SLIDE 1: TITLE SLIDE
    # =========================================================
    slide1 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide1)

    pill1 = slide1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.0), Inches(4.5), Inches(0.38))
    pill1.fill.solid()
    pill1.fill.fore_color.rgb = RGBColor(8, 30, 48)
    pill1.line.color.rgb = ACCENT_CYAN
    pill1.line.width = Pt(1)
    tf1 = pill1.text_frame
    p1 = tf1.paragraphs[0]
    p1.alignment = PP_ALIGN.CENTER
    r1 = p1.add_run()
    r1.text = "ROUND 2 DELIVERABLE — CHECKPOINT 2 (5:00 AM)"
    r1.font.size = Pt(10)
    r1.font.bold = True
    r1.font.color.rgb = ACCENT_CYAN

    # Big Title
    tb_main = slide1.shapes.add_textbox(Inches(0.8), Inches(1.6), Inches(11.5), Inches(1.5))
    tf_main = tb_main.text_frame
    tf_main.word_wrap = True
    pm = tf_main.paragraphs[0]
    rm = pm.add_run()
    rm.text = "VayuVision AI"
    rm.font.size = Pt(50)
    rm.font.bold = True
    rm.font.color.rgb = TEXT_WHITE

    ptag = tf_main.add_paragraph()
    rtag = ptag.add_run()
    rtag.text = "Predict. Prepare. Protect."
    rtag.font.size = Pt(28)
    rtag.font.bold = True
    rtag.font.color.rgb = ACCENT_CYAN

    # Subtitle
    tb_desc = slide1.shapes.add_textbox(Inches(0.8), Inches(3.3), Inches(11.5), Inches(0.8))
    tf_desc = tb_desc.text_frame
    tf_desc.word_wrap = True
    pdesc = tf_desc.paragraphs[0]
    rdesc = pdesc.add_run()
    rdesc.text = "AI-powered environmental intelligence: neighbourhood-level air pollution predicted before, during and after Diwali."
    rdesc.font.size = Pt(16)
    rdesc.font.color.rgb = TEXT_BODY

    # Team Box
    team_box = slide1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(4.3), Inches(11.7), Inches(2.2))
    team_box.fill.solid()
    team_box.fill.fore_color.rgb = CARD_BG
    team_box.line.color.rgb = BORDER_COLOR
    team_box.line.width = Pt(1)
    tf_team = team_box.text_frame
    tf_team.word_wrap = True
    pt = tf_team.paragraphs[0]
    rt = pt.add_run()
    rt.text = "TEAM CODESTORMS:"
    rt.font.size = Pt(14)
    rt.font.bold = True
    rt.font.color.rgb = ACCENT_CYAN

    members = [
        ("Rishika Jindal", "AI/ML & Data Engineering"),
        ("Navpreet Kaur", "Full-Stack Development & Architecture"),
        ("Yashika Bansal", "Environmental Analytics & Research"),
        ("Krishu Duggal", "UI/UX Design & Frontend Systems")
    ]
    for name, role in members:
        p_m = tf_team.add_paragraph()
        r_name = p_m.add_run()
        r_name.text = f"• {name}  —  "
        r_name.font.size = Pt(12)
        r_name.font.bold = True
        r_name.font.color.rgb = TEXT_WHITE
        r_role = p_m.add_run()
        r_role.text = role
        r_role.font.size = Pt(12)
        r_role.font.color.rgb = TEXT_MUTED

    # =========================================================
    # SLIDE 2: THE IDEA (PROBLEM, SOLUTION, 4 CORE FEATURES)
    # =========================================================
    slide2 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide2)
    add_header(slide2, "The Idea", "Problem, Solution & Core Features", "Moving from delayed retrospective monitoring to proactive hyperlocal prediction.")

    # Problem Box
    prob_box = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(5.6), Inches(1.7))
    prob_box.fill.solid()
    prob_box.fill.fore_color.rgb = CARD_BG
    prob_box.line.color.rgb = ACCENT_ROSE
    prob_box.line.width = Pt(1)
    tf_p = prob_box.text_frame
    tf_p.word_wrap = True
    pp = tf_p.paragraphs[0]
    rp = pp.add_run()
    rp.text = "THE PROBLEM\n"
    rp.font.size = Pt(13)
    rp.font.bold = True
    rp.font.color.rgb = ACCENT_ROSE
    rp_b = pp.add_run()
    rp_b.text = "Diwali pushes neighbourhood air quality from poor to severe within hours, but existing tools only report city-wide average AQI after the damage is done. Citizens receive delayed retrospective warnings."
    rp_b.font.size = Pt(11)
    rp_b.font.color.rgb = TEXT_BODY

    # Solution Box
    sol_box = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.8), Inches(5.7), Inches(1.7))
    sol_box.fill.solid()
    sol_box.fill.fore_color.rgb = CARD_BG
    sol_box.line.color.rgb = ACCENT_GREEN
    sol_box.line.width = Pt(1)
    tf_s = sol_box.text_frame
    tf_s.word_wrap = True
    ps = tf_s.paragraphs[0]
    rs = ps.add_run()
    rs.text = "THE SOLUTION\n"
    rs.font.size = Pt(13)
    rs.font.bold = True
    rs.font.color.rgb = ACCENT_GREEN
    rs_b = ps.add_run()
    rs_b.text = "Predict AQI and pollutant levels 24 to 72 hours ahead for each locality, then connect forecasts to proactive action across citizens, schools, and municipal authorities."
    rs_b.font.size = Pt(11)
    rs_b.font.color.rgb = TEXT_BODY

    # 4 Core Features Cards
    cards_data = [
        ("72-HOUR FORECAST", "AQI and pollutants forecasted by locality with 90% confidence bands.", ACCENT_CYAN),
        ("RISK HEATMAP", "Interactive Leaflet map showing where severe spikes & chokepoints are expected.", ACCENT_AMBER),
        ("WHATSAPP ALERTS", "Direct alerts where citizens already are, warning families before the nocturnal spike.", ACCENT_GREEN),
        ("ACTION TOOLS", "Hotspot sprinkler planning, school campus protocols, and personal exposure reduction.", ACCENT_ROSE)
    ]
    for i, (title, desc, color) in enumerate(cards_data):
        x = Inches(0.8 + i * 2.95)
        c_shape = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(3.8), Inches(2.8), Inches(3.0))
        c_shape.fill.solid()
        c_shape.fill.fore_color.rgb = CARD_BG
        c_shape.line.color.rgb = color
        c_shape.line.width = Pt(1.5)
        tf_c = c_shape.text_frame
        tf_c.word_wrap = True
        pc = tf_c.paragraphs[0]
        rc = pc.add_run()
        rc.text = f"{title}\n\n"
        rc.font.size = Pt(13)
        rc.font.bold = True
        rc.font.color.rgb = color
        rc_b = pc.add_run()
        rc_b.text = desc
        rc_b.font.size = Pt(11)
        rc_b.font.color.rgb = TEXT_BODY

    # =========================================================
    # SLIDE 3: TECHNICAL APPROACH (FLOW & GOVT LOOP)
    # =========================================================
    slide3 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide3)
    add_header(slide3, "Technical Approach", "System Architecture & Government Closed-Loop", "Data Sources -> Ingestion & Storage -> ML Forecast Engine -> Modules -> Stakeholders.")

    tech_cols = [
        ("DATA SOURCES", ["Govt AQI Stations (CPCB)", "IoT Sensors & OpenAQ", "Weather API (Open-Meteo)", "Satellite AOD / OSM"], ACCENT_CYAN),
        ("BACKEND ENGINE", ["Ingestion (REST / MQTT)", "Time-series DB Store", "Processing Engine (Lags)", "AQI calc & 24-72h forecast"], ACCENT_TEAL),
        ("MODULES", ["Alert Engine (WhatsApp Cloud)", "Govt Module (Sprinkler Plan)", "Event Planner (CampusAir)", "Personal Exposure (-32%)"], ACCENT_AMBER),
        ("USERS", ["Citizens on WhatsApp", "Govt Heatmap Dashboard", "Institutions (Schools/Colleges)", "Delivery Logistics Fleets"], ACCENT_GREEN)
    ]
    for i, (col_title, items, color) in enumerate(tech_cols):
        x = Inches(0.8 + i * 2.95)
        t_box = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(1.8), Inches(2.8), Inches(3.4))
        t_box.fill.solid()
        t_box.fill.fore_color.rgb = CARD_BG
        t_box.line.color.rgb = color
        t_box.line.width = Pt(1)
        tf_t = t_box.text_frame
        tf_t.word_wrap = True
        pt = tf_t.paragraphs[0]
        rt = pt.add_run()
        rt.text = f"{col_title}\n\n"
        rt.font.size = Pt(13)
        rt.font.bold = True
        rt.font.color.rgb = color
        for it in items:
            pit = tf_t.add_paragraph()
            rit = pit.add_run()
            rit.text = f"• {it}"
            rit.font.size = Pt(11)
            rit.font.color.rgb = TEXT_BODY

    # Govt Closed-Loop Box
    g_box = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(5.4), Inches(11.7), Inches(1.4))
    g_box.fill.solid()
    g_box.fill.fore_color.rgb = RGBColor(10, 25, 45)
    g_box.line.color.rgb = ACCENT_CYAN
    g_box.line.width = Pt(1.5)
    tf_g = g_box.text_frame
    tf_g.word_wrap = True
    pg = tf_g.paragraphs[0]
    rg = pg.add_run()
    rg.text = "GOVERNMENT CLOSED-LOOP:  "
    rg.font.size = Pt(12)
    rg.font.bold = True
    rg.font.color.rgb = ACCENT_CYAN
    rg_b = pg.add_run()
    rg_b.text = "Detect  →  Suggest  →  Approve  →  Dispatch Sprinklers  →  Re-measure AQI\n"
    rg_b.font.size = Pt(13)
    rg_b.font.bold = True
    rg_b.font.color.rgb = TEXT_WHITE
    rg_sub = pg.add_run()
    rg_sub.text = "Predicts severe nocturnal inversion choke-points 4 hours ahead, dispatches anti-smog water sprinklers (MCD-MIST-04), and verifies an estimated 18% to 25% particulate reduction."
    rg_sub.font.size = Pt(10.5)
    rg_sub.font.color.rgb = TEXT_MUTED

    # =========================================================
    # SLIDE 4: FEASIBILITY AND VIABILITY
    # =========================================================
    slide4 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide4)
    add_header(slide4, "Feasibility & Viability", "Data Sources, Implementation, Business Model & Challenges", "A grounded, sustainable execution plan designed for immediate real-world deployment.")

    viab_items = [
        ("DATA", "Open sources exist and integrated: CPCB CAAQMS stations, Open-Meteo atmospheric telemetry, OpenAQ network, and OSM road networks. Past Diwali seasons provide historical training sets.", ACCENT_CYAN),
        ("IMPLEMENTATION", "Python 3.13 & scikit-learn regressor (+47.2% error reduction over baseline), FastAPI asynchronous backend, React Leaflet dashboard, and WhatsApp Cloud API simulator. MVP built for Delhi NCR.", ACCENT_TEAL),
        ("BUSINESS MODEL", "Free alerts for citizens as a public good. Paid CampusAir SaaS (₹2,500/mo) for private schools/colleges. FleetSafe routing API for logistics. Annual municipal contracts for city bodies.", ACCENT_GREEN),
        ("CHALLENGES", "Few government sensors per sq km mean street-level values are statistical estimates with confidence ranges. Variations in cracker enforcement require dynamic uncertainty envelopes.", ACCENT_AMBER)
    ]
    for i, (v_title, v_desc, color) in enumerate(viab_items):
        row = i // 2
        col = i % 2
        x = Inches(0.8 + col * 6.0)
        y = Inches(1.8 + row * 2.6)
        v_box = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, Inches(5.7), Inches(2.3))
        v_box.fill.solid()
        v_box.fill.fore_color.rgb = CARD_BG
        v_box.line.color.rgb = color
        v_box.line.width = Pt(1)
        tf_v = v_box.text_frame
        tf_v.word_wrap = True
        pv = tf_v.paragraphs[0]
        rv = pv.add_run()
        rv.text = f"{v_title}\n\n"
        rv.font.size = Pt(13)
        rv.font.bold = True
        rv.font.color.rgb = color
        rv_b = pv.add_run()
        rv_b.text = v_desc
        rv_b.font.size = Pt(11)
        rv_b.font.color.rgb = TEXT_BODY

    # =========================================================
    # SLIDE 5: IMPACT AND BENEFITS
    # =========================================================
    slide5 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide5)
    add_header(slide5, "Impact & Benefits", "Triple-Tier Impact: Environmental, Social, and Institutional", "Predict. Prepare. Protect.")

    impact_cols = [
        ("ENVIRONMENTAL", [
            "Targeted dust suppression in spike areas prior to nocturnal temperature inversion.",
            "Lower inhaled particulate exposure during hazardous peak hours.",
            "Empirical micro-zone data to inform future firecracker regulations and zone zoning."
        ], ACCENT_GREEN),
        ("SOCIAL", [
            "Proactive warnings delivered on WhatsApp where people already spend time.",
            "Protects children, elderly, and asthma patients before exposure occurs.",
            "Families can reschedule morning walks to the 1:00 PM midday thermal mixing window."
        ], ACCENT_CYAN),
        ("INSTITUTIONAL", [
            "Schools and sports academies shift outdoor assemblies and matches indoors.",
            "Municipal governments target anti-smog mist guns directly to critical choke-points.",
            "Transforms urban governance from passive monitoring to predictive intervention."
        ], ACCENT_AMBER)
    ]
    for i, (imp_title, imp_points, color) in enumerate(impact_cols):
        x = Inches(0.8 + i * 3.95)
        i_box = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(1.8), Inches(3.8), Inches(4.8))
        i_box.fill.solid()
        i_box.fill.fore_color.rgb = CARD_BG
        i_box.line.color.rgb = color
        i_box.line.width = Pt(1.5)
        tf_i = i_box.text_frame
        tf_i.word_wrap = True
        pi = tf_i.paragraphs[0]
        ri = pi.add_run()
        ri.text = f"{imp_title}\n\n"
        ri.font.size = Pt(14)
        ri.font.bold = True
        ri.font.color.rgb = color
        for pt_str in imp_points:
            pip = tf_i.add_paragraph()
            rip = pip.add_run()
            rip.text = f"• {pt_str}\n"
            rip.font.size = Pt(11)
            rip.font.color.rgb = TEXT_BODY

    # Save presentation
    out_dir = os.path.dirname(os.path.abspath(__file__))
    out_path = os.path.join(out_dir, "VayuVision_AI_Hackathon_Round2.pptx")
    prs.save(out_path)
    print(f"Presentation generated successfully at: {out_path}")

if __name__ == "__main__":
    build_round2_presentation()
