import os
import pptx
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

def build_presentation():
    prs = pptx.Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # Theme Colors
    BG_DARK = RGBColor(11, 19, 43)        # #0B132B Deep Charcoal Navy
    CARD_BG = RGBColor(22, 33, 62)        # #16213E Dark Slate Card
    CARD_BG_ALT = RGBColor(15, 23, 42)    # #0F172A Slate 900
    ACCENT_GREEN = RGBColor(16, 185, 129) # #10B981 Emerald
    ACCENT_CYAN = RGBColor(6, 182, 212)   # #06B6D4 Cyan
    TEXT_WHITE = RGBColor(248, 250, 252)  # #F8FAFC High Contrast
    TEXT_MUTED = RGBColor(148, 163, 184)  # #94A3B8 Cool Grey
    TEXT_BODY = RGBColor(226, 232, 240)   # #E2E8F0 Soft White
    BORDER_COLOR = RGBColor(51, 65, 85)   # #334155 Slate Border

    # Risk Colors
    COLOR_GOOD = RGBColor(34, 197, 94)     # #22C55E Green (0-50)
    COLOR_MOD = RGBColor(245, 158, 11)     # #F59E0B Amber (101-200)
    COLOR_POOR = RGBColor(239, 68, 68)     # #EF4444 Red (201-300)
    COLOR_SEVERE = RGBColor(147, 51, 234)  # #9333EA Purple (401-500)

    def set_slide_background(slide, color=BG_DARK):
        bg_shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
        bg_shape.fill.solid()
        bg_shape.fill.fore_color.rgb = color
        bg_shape.line.fill.background() # no line

    def add_header(slide, category, title, subtitle):
        # Category pill
        pill = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(0.4), Inches(2.8), Inches(0.32))
        pill.fill.solid()
        pill.fill.fore_color.rgb = RGBColor(15, 35, 45)
        pill.line.color.rgb = ACCENT_GREEN
        pill.line.width = Pt(1)
        tf_pill = pill.text_frame
        tf_pill.word_wrap = True
        tf_pill.vertical_anchor = MSO_ANCHOR.MIDDLE
        p0 = tf_pill.paragraphs[0]
        p0.alignment = PP_ALIGN.CENTER
        run = p0.add_run()
        run.text = f"AIRPULSE  |  {category.upper()}"
        run.font.name = "Arial"
        run.font.size = Pt(9.5)
        run.font.bold = True
        run.font.color.rgb = ACCENT_GREEN

        # Title
        tx_title = slide.shapes.add_textbox(Inches(0.8), Inches(0.75), Inches(11.733), Inches(0.55))
        tf_title = tx_title.text_frame
        tf_title.word_wrap = True
        p_title = tf_title.paragraphs[0]
        p_title.text = title
        p_title.font.name = "Arial"
        p_title.font.size = Pt(22)
        p_title.font.bold = True
        p_title.font.color.rgb = TEXT_WHITE

        # Subtitle
        tx_sub = slide.shapes.add_textbox(Inches(0.8), Inches(1.3), Inches(11.733), Inches(0.35))
        tf_sub = tx_sub.text_frame
        tf_sub.word_wrap = True
        p_sub = tf_sub.paragraphs[0]
        p_sub.text = subtitle
        p_sub.font.name = "Calibri"
        p_sub.font.size = Pt(12)
        p_sub.font.color.rgb = TEXT_MUTED

    def add_footer(slide, slide_num, total=8):
        # Divider line
        line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(7.0), Inches(11.733), Inches(0.02))
        line.fill.solid()
        line.fill.fore_color.rgb = BORDER_COLOR
        line.line.fill.background()

        # Left label
        tx_left = slide.shapes.add_textbox(Inches(0.8), Inches(7.05), Inches(8.0), Inches(0.35))
        tf_left = tx_left.text_frame
        p_l = tf_left.paragraphs[0]
        p_l.text = "AirPulse: AI-Powered Diwali Air Quality Prediction  |  Round 1 Deliverable"
        p_l.font.name = "Calibri"
        p_l.font.size = Pt(9.5)
        p_l.font.color.rgb = TEXT_MUTED

        # Right label
        tx_right = slide.shapes.add_textbox(Inches(10.533), Inches(7.05), Inches(2.0), Inches(0.35))
        tf_right = tx_right.text_frame
        p_r = tf_right.paragraphs[0]
        p_r.alignment = PP_ALIGN.RIGHT
        p_r.text = f"Slide {slide_num} of {total}"
        p_r.font.name = "Calibri"
        p_r.font.size = Pt(9.5)
        p_r.font.color.rgb = TEXT_MUTED

    def add_card(slide, left, top, width, height, bg_color=CARD_BG, border_color=BORDER_COLOR):
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        card.fill.solid()
        card.fill.fore_color.rgb = bg_color
        card.line.color.rgb = border_color
        card.line.width = Pt(1)
        return card

    # ==========================================
    # SLIDE 1: TITLE
    # ==========================================
    slide1 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide1)

    # Accent decorative gradient glow cards behind title
    glow1 = add_card(slide1, Inches(0.8), Inches(0.8), Inches(11.733), Inches(5.8), bg_color=CARD_BG_ALT, border_color=RGBColor(30, 58, 85))

    # Hackathon badge
    badge = slide1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.3), Inches(1.2), Inches(3.6), Inches(0.35))
    badge.fill.solid()
    badge.fill.fore_color.rgb = RGBColor(16, 45, 40)
    badge.line.color.rgb = ACCENT_GREEN
    badge.line.width = Pt(1)
    tf_b = badge.text_frame
    p_b = tf_b.paragraphs[0]
    p_b.alignment = PP_ALIGN.CENTER
    r_b = p_b.add_run()
    r_b.text = "HACKATHON 2026  •  ROUND 1 SUBMISSION"
    r_b.font.name = "Arial"
    r_b.font.size = Pt(10)
    r_b.font.bold = True
    r_b.font.color.rgb = ACCENT_GREEN

    # Title & Subtitle Box
    tx_t1 = slide1.shapes.add_textbox(Inches(1.25), Inches(1.75), Inches(10.8), Inches(2.2))
    tf_t1 = tx_t1.text_frame
    tf_t1.word_wrap = True

    p_proj = tf_t1.paragraphs[0]
    p_proj.text = "AirPulse"
    p_proj.font.name = "Arial"
    p_proj.font.size = Pt(46)
    p_proj.font.bold = True
    p_proj.font.color.rgb = TEXT_WHITE

    p_sub1 = tf_t1.add_paragraph()
    p_sub1.text = "AI-Powered Diwali Air Quality Prediction"
    p_sub1.font.name = "Arial"
    p_sub1.font.size = Pt(22)
    p_sub1.font.bold = True
    p_sub1.font.color.rgb = ACCENT_CYAN
    p_sub1.space_before = Pt(6)

    p_tag = tf_t1.add_paragraph()
    p_tag.text = "Predict Pollution.  Understand Exposure.  Make Better Decisions."
    p_tag.font.name = "Calibri"
    p_tag.font.size = Pt(15)
    p_tag.font.italic = True
    p_tag.font.color.rgb = ACCENT_GREEN
    p_tag.space_before = Pt(8)

    # Info Grid / Placeholders (4 boxes for Team Name, Members, Institution, Focus)
    meta_cards = [
        ("TEAM NAME", "[Team Alpha Innovators]", "Assigned Team Track"),
        ("TEAM MEMBERS", "[Member 1, Member 2, Member 3, Member 4]", "Core Engineering Team"),
        ("INSTITUTION", "[Your University / Institution Name]", "Department of Computer Science"),
        ("HACKATHON TRACK", "[Diwali Air Quality / Green AI Track]", "Round 1 Foundation & Architecture")
    ]
    card_w = Inches(2.6)
    card_h = Inches(1.7)
    start_left = Inches(1.3)
    top_pos = Inches(4.4)
    spacing = Inches(0.24)

    for i, (label, val, desc) in enumerate(meta_cards):
        c_left = start_left + i * (card_w + spacing)
        m_card = add_card(slide1, c_left, top_pos, card_w, card_h, bg_color=CARD_BG, border_color=BORDER_COLOR)
        tx_m = slide1.shapes.add_textbox(c_left + Inches(0.12), top_pos + Inches(0.12), card_w - Inches(0.24), card_h - Inches(0.24))
        tf_m = tx_m.text_frame
        tf_m.word_wrap = True

        p_lbl = tf_m.paragraphs[0]
        p_lbl.text = label
        p_lbl.font.name = "Arial"
        p_lbl.font.size = Pt(9)
        p_lbl.font.bold = True
        p_lbl.font.color.rgb = ACCENT_CYAN

        p_val = tf_m.add_paragraph()
        p_val.text = val
        p_val.font.name = "Arial"
        p_val.font.size = Pt(11)
        p_val.font.bold = True
        p_val.font.color.rgb = TEXT_WHITE
        p_val.space_before = Pt(4)

        p_desc = tf_m.add_paragraph()
        p_desc.text = desc
        p_desc.font.name = "Calibri"
        p_desc.font.size = Pt(9.5)
        p_desc.font.color.rgb = TEXT_MUTED
        p_desc.space_before = Pt(3)

    add_footer(slide1, 1)

    slide1.notes_slide.notes_text_frame.text = (
        "SPEAKER SCRIPT — SLIDE 1 (TITLE):\n"
        "Good morning/afternoon respected judges and mentors. Today we are proud to introduce AirPulse: "
        "an AI-powered platform engineered specifically to predict neighbourhood-level air pollution before, "
        "during, and after Diwali.\n\n"
        "Our core tagline defines our entire project philosophy: 'Predict Pollution. Understand Exposure. Make Better Decisions.'\n"
        "Rather than showing just an abstract city-wide number that people can't act on, AirPulse is built to bring actionable "
        "environmental intelligence down to the micro-zone level. Over the next 7 slides, we will walk you through our exact "
        "problem statement, our proposed solution, core capabilities, our unique personal exposure planner, system architecture, "
        "technical feasibility, and long-term impact."
    )

    # ==========================================
    # SLIDE 2: PROBLEM STATEMENT
    # ==========================================
    slide2 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide2)
    add_header(slide2, "The Core Problem", "Problem Statement: Beyond The City Average",
               "Why single city-wide AQI figures fail citizens and hide severe neighbourhood disparities.")

    # 3 Core Problem Cards
    col_w = Inches(3.68)
    col_h = Inches(4.9)
    col_y = Inches(1.85)

    # Card 1: The Macro Average Fallacy
    c1 = add_card(slide2, Inches(0.8), col_y, col_w, col_h)
    tx_c1 = slide2.shapes.add_textbox(Inches(0.95), col_y + Inches(0.15), col_w - Inches(0.3), col_h - Inches(0.3))
    tf1 = tx_c1.text_frame
    tf1.word_wrap = True

    p = tf1.paragraphs[0]
    p.text = "01 | MACRO AVERAGE ILLUSION"
    p.font.name = "Arial"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = COLOR_MOD

    p = tf1.add_paragraph()
    p.text = "City-Wide Metrics Mask Reality"
    p.font.name = "Arial"
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = TEXT_WHITE
    p.space_before = Pt(4)

    p = tf1.add_paragraph()
    p.text = (
        "• Common weather apps report a single consolidated AQI (e.g., 'Delhi: 385').\n\n"
        "• In reality, neighbourhood variance exceeds 200+ AQI points simultaneously. While Lodhi Road or IGI Airport may record 240, dense choke-points like Anand Vihar or Jahangirpuri cross 490+.\n\n"
        "• Micro-factors: Local road congestion, street canyons, green cover, and hyper-local firecracker density create isolated toxic pockets."
    )
    p.font.name = "Calibri"
    p.font.size = Pt(11.5)
    p.font.color.rgb = TEXT_BODY
    p.space_before = Pt(8)

    # Card 2: The Diwali Multiplier Effect
    c2 = add_card(slide2, Inches(4.82), col_y, col_w, col_h)
    tx_c2 = slide2.shapes.add_textbox(Inches(4.97), col_y + Inches(0.15), col_w - Inches(0.3), col_h - Inches(0.3))
    tf2 = tx_c2.text_frame
    tf2.word_wrap = True

    p = tf2.paragraphs[0]
    p.text = "02 | THE DIWALI MULTIPLIER"
    p.font.name = "Arial"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = COLOR_POOR

    p = tf2.add_paragraph()
    p.text = "Compound Non-Linear Surge"
    p.font.name = "Arial"
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = TEXT_WHITE
    p.space_before = Pt(4)

    p = tf2.add_paragraph()
    p.text = (
        "• Winter Inversion: Falling temperatures and low planetary boundary layer trap surface emissions close to ground breathing levels.\n\n"
        "• Sudden Burst: Heavy nocturnal fireworks generate unprecedented spikes in toxic PM2.5, PM10, barium, and sulfur compounds in 4-6 hours.\n\n"
        "• Dispersion Bottleneck: Calm surface winds (<2 m/s) prevent particulate dispersal, causing severe accumulation for 48-72 hours post-Diwali."
    )
    p.font.name = "Calibri"
    p.font.size = Pt(11.5)
    p.font.color.rgb = TEXT_BODY
    p.space_before = Pt(8)

    # Card 3: The Citizen Decision Void
    c3 = add_card(slide2, Inches(8.84), col_y, col_w, col_h)
    tx_c3 = slide2.shapes.add_textbox(Inches(8.99), col_y + Inches(0.15), col_w - Inches(0.3), col_h - Inches(0.3))
    tf3 = tx_c3.text_frame
    tf3.word_wrap = True

    p = tf3.paragraphs[0]
    p.text = "03 | CITIZEN DECISION VOID"
    p.font.name = "Arial"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = ACCENT_CYAN

    p = tf3.add_paragraph()
    p.text = "Lagging Data & No Guidance"
    p.font.name = "Arial"
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = TEXT_WHITE
    p.space_before = Pt(4)

    p = tf3.add_paragraph()
    p.text = (
        "• Reactive, Not Proactive: Existing dashboards only report what was already inhaled 1 to 2 hours ago. There is no neighbourhood forecast.\n\n"
        "• Vulnerable Groups Suffer: Asthmatic patients, outdoor athletes, school children, and daily commuters cannot plan their day.\n\n"
        "• Core Need: A dedicated platform that forecasts pre-, peak, and post-Diwali trends and translates numbers into actionable exposure-reduction options."
    )
    p.font.name = "Calibri"
    p.font.size = Pt(11.5)
    p.font.color.rgb = TEXT_BODY
    p.space_before = Pt(8)

    add_footer(slide2, 2)

    slide2.notes_slide.notes_text_frame.text = (
        "SPEAKER SCRIPT — SLIDE 2 (PROBLEM STATEMENT):\n"
        "Judges, when you open an ordinary weather app during Diwali, you see a single number: 'City AQI: 380'. "
        "But air pollution is not uniform across a city. In Delhi, for example, Anand Vihar can easily touch 490 with hazardous firecracker "
        "trapping, while Lodhi Road or Dwarka might be 240. That 250-point delta means life-altering exposure differences for families.\n\n"
        "During Diwali, three factors converge: sudden nocturnal emissions, low wind speeds, and severe winter temperature inversion. "
        "Current systems are purely reactive—they tell you what you already inhaled an hour ago. Citizens, schools, and outdoor workers "
        "need predictive foresight: what will my specific neighbourhood look like before, during, and after Diwali, and how can I avoid peak toxic hours?"
    )

    # ==========================================
    # SLIDE 3: OUR SOLUTION
    # ==========================================
    slide3 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide3)
    add_header(slide3, "Strategic Approach", "Our Solution: AirPulse Environmental Intelligence",
               "Translating historical multi-source data into micro-zone forecasts and actionable exposure reduction.")

    # Top summary card
    top_c = add_card(slide3, Inches(0.8), Inches(1.85), Inches(11.733), Inches(1.15))
    tx_top = slide3.shapes.add_textbox(Inches(1.0), Inches(1.92), Inches(11.333), Inches(0.95))
    tf_top = tx_top.text_frame
    tf_top.word_wrap = True
    p = tf_top.paragraphs[0]
    p.text = "THE AIRPULSE PARADIGM: FROM RAW DATA TO PERSONAL ACTION"
    p.font.name = "Arial"
    p.font.size = Pt(10.5)
    p.font.bold = True
    p.font.color.rgb = ACCENT_GREEN

    p = tf_top.add_paragraph()
    p.text = (
        "AirPulse integrates historical continuous ambient monitoring (CPCB), meteorological atmospheric models (IMD/OpenWeather), "
        "and festive anomaly patterns to forecast neighbourhood AQI across a 3-phase Diwali timeline, empowering users with informed activity choices."
    )
    p.font.name = "Calibri"
    p.font.size = Pt(12)
    p.font.color.rgb = TEXT_BODY
    p.space_before = Pt(4)

    # Visual Journey: 4-Step Pipeline Flow Cards
    steps = [
        ("STEP 1: INGESTION", "Multi-Source Data Ingestion",
         "• Historical CPCB hourly AQI (PM2.5, PM10, NO2, CO)\n• Weather parameters (wind speed, inversion, humidity)\n• Festive calendar & localized traffic proxy signals",
         ACCENT_CYAN),
        ("STEP 2: PROCESSING", "Feature Engineering",
         "• Rolling temporal lags (24h/48h moving averages)\n• Atmospheric stagnation & ventilation index calculation\n• Missing data interpolation & spatial mapping",
         COLOR_MOD),
        ("STEP 3: FORECASTING", "Proposed ML Engine",
         "• Time-aware regression pipeline (RF / GradientBoosting)\n• 3-Phase Diwali temporal curve projection\n• Uncertainty & data limitation boundary estimation",
         ACCENT_GREEN),
        ("STEP 4: ACTION", "Decision Support",
         "• Hyperlocal neighbourhood AQI & timeline curves\n• Personal Pollution Exposure & Activity Planner\n• Transparent demonstration labeling & alerts",
         COLOR_POOR)
    ]

    s_w = Inches(2.78)
    s_h = Inches(3.6)
    s_y = Inches(3.2)
    s_spacing = Inches(0.2)

    for i, (tag, stitle, sdesc, scolor) in enumerate(steps):
        s_left = Inches(0.8) + i * (s_w + s_spacing)
        sc = add_card(slide3, s_left, s_y, s_w, s_h)

        # Header bar inside card
        hbar = slide3.shapes.add_shape(MSO_SHAPE.RECTANGLE, s_left, s_y, s_w, Inches(0.35))
        hbar.fill.solid()
        hbar.fill.fore_color.rgb = RGBColor(15, 23, 42)
        hbar.line.fill.background()
        tf_hb = hbar.text_frame
        p_hb = tf_hb.paragraphs[0]
        p_hb.alignment = PP_ALIGN.CENTER
        r = p_hb.add_run()
        r.text = tag
        r.font.name = "Arial"
        r.font.size = Pt(9)
        r.font.bold = True
        r.font.color.rgb = scolor

        # Text box
        tx_s = slide3.shapes.add_textbox(s_left + Inches(0.12), s_y + Inches(0.42), s_w - Inches(0.24), s_h - Inches(0.5))
        tf_s = tx_s.text_frame
        tf_s.word_wrap = True

        p_t = tf_s.paragraphs[0]
        p_t.text = stitle
        p_t.font.name = "Arial"
        p_t.font.size = Pt(12)
        p_t.font.bold = True
        p_t.font.color.rgb = TEXT_WHITE

        p_d = tf_s.add_paragraph()
        p_d.text = sdesc
        p_d.font.name = "Calibri"
        p_d.font.size = Pt(10.5)
        p_d.font.color.rgb = TEXT_BODY
        p_d.space_before = Pt(8)

    add_footer(slide3, 3)

    slide3.notes_slide.notes_text_frame.text = (
        "SPEAKER SCRIPT — SLIDE 3 (OUR SOLUTION):\n"
        "Here is the core vision of AirPulse. We build a clear 4-step pipeline that takes raw environmental data all the way to citizen action.\n\n"
        "Step 1 ingests multi-source data: historical CPCB station readings, meteorological variables like wind speed and inversion height, and festive traffic signals.\n"
        "Step 2 performs feature engineering: temporal lag windows, stagnation indices, and localized baselines.\n"
        "Step 3 is our proposed ML component: training time-aware regression models to estimate the three-phase Diwali curve.\n"
        "And Step 4 is where we shine: delivering neighbourhood forecasts, visual trend timelines, and an interactive personal exposure planner. "
        "Notice we are completely honest with the judges: all current forecast values in our prototype are clearly labeled as demonstration data, ready for model integration."
    )

    # ==========================================
    # SLIDE 4: CORE FEATURES
    # ==========================================
    slide4 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide4)
    add_header(slide4, "Platform Capabilities", "Core Features: Granular Insights for Citizens",
               "Four purpose-built modules designed for transparent, neighbourhood-level environmental awareness.")

    # 4 Feature Quadrants
    q_w = Inches(5.72)
    q_h = Inches(2.35)
    row1_y = Inches(1.85)
    row2_y = Inches(4.45)
    col1_x = Inches(0.8)
    col2_x = Inches(6.81)

    features = [
        (col1_x, row1_y, "FEATURE 1: NEIGHBOURHOOD-LEVEL FORECASTING", "Hyperlocal Micro-Zone Predictions",
         "• Allows users to select specific monitored zones (Anand Vihar, Lodhi Road, Rohini, IGI Airport).\n"
         "• Displays measured ground-truth CPCB observations alongside predictive forecast curves.\n"
         "• Clearly tags actual vs demonstration forecast with timestamp and station coordinates.",
         ACCENT_GREEN),

        (col2_x, row1_y, "FEATURE 2: 3-PHASE DIWALI TIMELINE", "Pre, During & Post Diwali Dynamics",
         "• Pre-Diwali Phase (Days -3 to -1): Ambient baseline build-up and stubble smoke transit.\n"
         "• Peak Diwali Phase (Days 0 to +1): Severe nocturnal spike from firecracker emissions.\n"
         "• Post-Diwali Phase (Days +2 to +4): Slow particulate clearance and residual exposure.",
         COLOR_MOD),

        (col1_x, row2_y, "FEATURE 3: NEIGHBOURHOOD COMPARISON & HEATMAP", "Disparity Analysis Across Zones",
         "• Interactive cross-neighbourhood comparative cards and risk heatmap visualization.\n"
         "• Identifies safer green corridors (e.g. Lodhi Garden) vs critical hotspots (e.g. Anand Vihar).\n"
         "• Categorized by standard National AQI bands (Good, Moderate, Poor, Severe).",
         ACCENT_CYAN),

        (col2_x, row2_y, "FEATURE 4: ENVIRONMENTAL INSIGHTS & SMART ALERTS", "Correlating Meteorology with Toxicity",
         "• Visualizes wind speed, temperature inversion, and relative humidity against PM levels.\n"
         "• Proactive threshold alerts: Notifies users when AQI is projected to breach hazardous limits (>400).\n"
         "• Ready for live API and automated webhooks in subsequent implementation phases.",
         COLOR_SEVERE)
    ]

    for (x, y, tag, ftitle, fdesc, color) in features:
        card = add_card(slide4, x, y, q_w, q_h)

        # Top indicator bar
        bar = slide4.shapes.add_shape(MSO_SHAPE.RECTANGLE, x, y, q_w, Inches(0.28))
        bar.fill.solid()
        bar.fill.fore_color.rgb = RGBColor(15, 23, 42)
        bar.line.fill.background()
        tf_bar = bar.text_frame
        p_b = tf_bar.paragraphs[0]
        p_b.alignment = PP_ALIGN.LEFT
        r = p_b.add_run()
        r.text = f"  {tag}"
        r.font.name = "Arial"
        r.font.size = Pt(8.5)
        r.font.bold = True
        r.font.color.rgb = color

        tx = slide4.shapes.add_textbox(x + Inches(0.15), y + Inches(0.35), q_w - Inches(0.3), q_h - Inches(0.4))
        tf = tx.text_frame
        tf.word_wrap = True

        p_t = tf.paragraphs[0]
        p_t.text = ftitle
        p_t.font.name = "Arial"
        p_t.font.size = Pt(13)
        p_t.font.bold = True
        p_t.font.color.rgb = TEXT_WHITE

        p_d = tf.add_paragraph()
        p_d.text = fdesc
        p_d.font.name = "Calibri"
        p_d.font.size = Pt(10.5)
        p_d.font.color.rgb = TEXT_BODY
        p_d.space_before = Pt(5)

    add_footer(slide4, 4)

    slide4.notes_slide.notes_text_frame.text = (
        "SPEAKER SCRIPT — SLIDE 4 (CORE FEATURES):\n"
        "Slide 4 showcases the core feature suite built into AirPulse:\n"
        "1. Neighbourhood-level AQI forecasting: Users pick their exact neighbourhood rather than a blanket city label. Crucially, "
        "we clearly separate measured sensor ground truth from our future forecast.\n"
        "2. The 3-Phase Diwali Timeline: We explicitly break the festive period into Pre-Diwali accumulation, Diwali Night peak, "
        "and Post-Diwali dispersion, helping citizens see how long toxic air lingers.\n"
        "3. Neighbourhood Comparison & Heatmap: Enables instant comparison so students or families can identify lower-pollution pockets.\n"
        "4. Environmental Insights & Smart Alerts: We show the meteorological drivers behind pollution (wind speed and humidity) "
        "and deliver smart threshold alerts when severe AQI spikes are projected."
    )

    # ==========================================
    # SLIDE 5: UNIQUE EXTRA FEATURE
    # ==========================================
    slide5 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide5)
    add_header(slide5, "Differentiating Innovation", "Unique Feature: Personal Pollution Exposure Planner",
               "Translating forecast data into actionable outdoor activity scheduling with ethical health boundaries.")

    # Left Column: Concept & Activity Modes (Width 5.6")
    c_left = add_card(slide5, Inches(0.8), Inches(1.85), Inches(5.6), Inches(4.9))
    tx_l = slide5.shapes.add_textbox(Inches(0.95), Inches(2.0), Inches(5.3), Inches(4.6))
    tf_l = tx_l.text_frame
    tf_l.word_wrap = True

    p = tf_l.paragraphs[0]
    p.text = "PURPOSE & ACTIVITY-BASED PLANNING"
    p.font.name = "Arial"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = ACCENT_GREEN

    p = tf_l.add_paragraph()
    p.text = "How Citizens Minimize Inhaled Toxins"
    p.font.name = "Arial"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = TEXT_WHITE
    p.space_before = Pt(4)

    p = tf_l.add_paragraph()
    p.text = (
        "• The Core Gap: Knowing AQI is 400 is useless if you don't know *when* or *how* to adjust your day. Exposure = Concentration × Inhalation Rate × Time.\n\n"
        "• 4 Activity Profiles:\n"
        "   1. Walking & Jogging (High ventilation rate, sensitive to morning smog)\n"
        "   2. Outdoor Sports & Training (Colleges, academies, children)\n"
        "   3. Daily Commuting (Bikers, pedestrians during rush hours)\n"
        "   4. Outdoor Social Events (Diwali gatherings, markets, pujas)\n\n"
        "• Slot Comparison Engine: Compares Early Morning (6 AM), Afternoon (1 PM), and Evening (8 PM) slots to locate the *comparative lowest-pollution window*."
    )
    p.font.name = "Calibri"
    p.font.size = Pt(11)
    p.font.color.rgb = TEXT_BODY
    p.space_before = Pt(6)

    # Right Column: Interface Mockup & Responsible Disclaimer (Width 5.8")
    # Top card: Mockup UI Card
    c_mock = add_card(slide5, Inches(6.7), Inches(1.85), Inches(5.833), Inches(3.0), bg_color=CARD_BG_ALT)
    tx_mock = slide5.shapes.add_textbox(Inches(6.85), Inches(1.95), Inches(5.533), Inches(2.8))
    tf_m = tx_mock.text_frame
    tf_m.word_wrap = True

    p = tf_m.paragraphs[0]
    p.text = "ACTIVITY PLANNER — DEMONSTRATION INTERFACE"
    p.font.name = "Arial"
    p.font.size = Pt(10)
    p.font.bold = True
    p.font.color.rgb = ACCENT_CYAN

    # Simulated interface items
    p = tf_m.add_paragraph()
    p.text = "Selected: Outdoor Jogging  |  Location: Anand Vihar  |  Date: Diwali Day"
    p.font.name = "Arial"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = TEXT_WHITE
    p.space_before = Pt(4)

    p = tf_m.add_paragraph()
    p.text = (
        "• Slot Comparison Results:\n"
        "   ❌ 06:00 AM – 08:00 AM: Forecast AQI 425 [Severe] (Nocturnal inversion peak)\n"
        "   ⭐ 01:30 PM – 03:30 PM: Forecast AQI 295 [Poor] (Sunlight & thermal mixing)\n"
        "   ❌ 08:00 PM – 11:00 PM: Forecast AQI 485 [Hazardous] (Firecracker surge)\n\n"
        "💡 Actionable Recommendation: Shift training to 1:30 PM. Estimated particulate exposure reduction: ~31% relative to morning peak. Wear N95 outdoors."
    )
    p.font.name = "Calibri"
    p.font.size = Pt(10)
    p.font.color.rgb = TEXT_BODY
    p.space_before = Pt(4)

    # Bottom card: Responsible Medical Disclaimer Card
    c_disc = add_card(slide5, Inches(6.7), Inches(5.0), Inches(5.833), Inches(1.75), bg_color=RGBColor(30, 20, 25), border_color=COLOR_POOR)
    tx_disc = slide5.shapes.add_textbox(Inches(6.85), Inches(5.08), Inches(5.533), Inches(1.6))
    tf_d = tx_disc.text_frame
    tf_d.word_wrap = True

    p = tf_d.paragraphs[0]
    p.text = "⚠️ RESPONSIBLE AI & HEALTH GOVERNANCE DISCLAIMER"
    p.font.name = "Arial"
    p.font.size = Pt(9.5)
    p.font.bold = True
    p.font.color.rgb = COLOR_POOR

    p = tf_d.add_paragraph()
    p.text = (
        "• Environmental Awareness Tool: This feature is strictly an exposure-reduction advisory tool based on atmospheric forecasts.\n"
        "• NOT A MEDICAL SYSTEM: Does not diagnose asthma or clinical conditions, prescribe medications, or guarantee absolute physiological safety.\n"
        "• Zero Sensitive Data Collection: Operates without requiring user medical records or personal health identifiers."
    )
    p.font.name = "Calibri"
    p.font.size = Pt(9.5)
    p.font.color.rgb = RGBColor(254, 202, 202)
    p.space_before = Pt(4)

    add_footer(slide5, 5)

    slide5.notes_slide.notes_text_frame.text = (
        "SPEAKER SCRIPT — SLIDE 5 (PERSONAL EXPOSURE PLANNER):\n"
        "Judges, Slide 5 highlights our primary differentiating feature: the Personal Pollution Exposure & Activity Planner.\n\n"
        "Raw pollution numbers often induce helplessness. A citizen says: 'It's Diwali, AQI is 400, what am I supposed to do?' "
        "Our planner bridges that gap. Users select their activity—whether it's morning walking, college outdoor sports, or daily commuting. "
        "The system compares hourly forecast windows and identifies comparatively lower-exposure time slots. For example, moving a jog "
        "from 6 AM (AQI 425) to 1:30 PM (AQI 295) can lower inhaled particulate load by over 30% due to daytime atmospheric mixing.\n\n"
        "Crucially, we maintain strict medical and ethical boundaries: this is an environmental awareness tool, NOT a diagnostic system. "
        "We never claim an outdoor activity is '100% safe', we don't prescribe medications, and we collect zero personal health data."
    )

    # ==========================================
    # SLIDE 6: SYSTEM ARCHITECTURE
    # ==========================================
    slide6 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide6)
    add_header(slide6, "Technical Design", "System Architecture: End-to-End Modular Pipeline",
               "Clean decoupling of presentation, API services, data pipelines, and future ML components.")

    # Architecture Diagram: 7 Horizontal Connected Blocks
    arch_nodes = [
        ("1. USER CLIENT", "React Dashboard\n& Activity Planner", "Vite + Tailwind + Recharts\nInteractive UI", ACCENT_CYAN, "Implemented"),
        ("2. API GATEWAY", "FastAPI Backend\nMicroservice", "RESTful Endpoints\nCORS & Pydantic Validation", ACCENT_GREEN, "Implemented"),
        ("3. DATA PIPELINE", "Ingestion &\nPreprocessing", "Missing value interpolation\nLag Feature Engineering", COLOR_MOD, "Implemented (Demo)"),
        ("4. DATA SOURCES", "Historical & Sensor\nEnviron. Data", "CPCB NAQI ground stations\nOpenWeather / IMD weather", COLOR_MOD, "Integration Planned"),
        ("5. ML ENGINE", "Proposed Forecasting\nComponent", "RandomForest / GradientBoosting\nTime-series regression", COLOR_SEVERE, "Model Scaffolded"),
        ("6. FORECAST API", "AQI Forecast &\nExposure Logic", "Pre/During/Post Diwali\nSlot Recommendation Engine", ACCENT_GREEN, "Implemented"),
        ("7. DECISION UI", "Dashboard, Heatmap\n& Smart Alerts", "Hourly trend cards\nPractical reduction advice", ACCENT_CYAN, "Implemented")
    ]

    node_w = Inches(1.52)
    node_h = Inches(3.6)
    node_y = Inches(2.0)
    start_x = Inches(0.8)
    gap = Inches(0.18)

    for i, (n_tag, n_title, n_desc, n_color, status) in enumerate(arch_nodes):
        nx = start_x + i * (node_w + gap)
        card = add_card(slide6, nx, node_y, node_w, node_h, bg_color=CARD_BG)

        # Header tag
        tx_t = slide6.shapes.add_textbox(nx + Inches(0.08), node_y + Inches(0.1), node_w - Inches(0.16), Inches(0.5))
        tf = tx_t.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.alignment = PP_ALIGN.CENTER
        p.text = n_tag
        p.font.name = "Arial"
        p.font.size = Pt(8)
        p.font.bold = True
        p.font.color.rgb = n_color

        # Title
        tx_b = slide6.shapes.add_textbox(nx + Inches(0.06), node_y + Inches(0.65), node_w - Inches(0.12), Inches(1.1))
        tf_b = tx_b.text_frame
        tf_b.word_wrap = True
        p = tf_b.paragraphs[0]
        p.alignment = PP_ALIGN.CENTER
        p.text = n_title
        p.font.name = "Arial"
        p.font.size = Pt(10)
        p.font.bold = True
        p.font.color.rgb = TEXT_WHITE

        # Desc
        tx_d = slide6.shapes.add_textbox(nx + Inches(0.06), node_y + Inches(1.8), node_w - Inches(0.12), Inches(1.1))
        tf_d = tx_d.text_frame
        tf_d.word_wrap = True
        p = tf_d.paragraphs[0]
        p.alignment = PP_ALIGN.CENTER
        p.text = n_desc
        p.font.name = "Calibri"
        p.font.size = Pt(8.5)
        p.font.color.rgb = TEXT_BODY

        # Status Pill at bottom of card
        stat_shape = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, nx + Inches(0.1), node_y + Inches(3.05), node_w - Inches(0.2), Inches(0.35))
        stat_shape.fill.solid()
        stat_shape.fill.fore_color.rgb = RGBColor(15, 23, 42)
        stat_shape.line.color.rgb = n_color
        stat_shape.line.width = Pt(1)
        tf_st = stat_shape.text_frame
        p_st = tf_st.paragraphs[0]
        p_st.alignment = PP_ALIGN.CENTER
        r = p_st.add_run()
        r.text = status
        r.font.name = "Arial"
        r.font.size = Pt(7.5)
        r.font.bold = True
        r.font.color.rgb = n_color

        # Arrow connector to next node
        if i < len(arch_nodes) - 1:
            arr = slide6.shapes.add_shape(MSO_SHAPE.RIGHT_ARROW, nx + node_w + Inches(0.02), node_y + Inches(1.6), Inches(0.14), Inches(0.2))
            arr.fill.solid()
            arr.fill.fore_color.rgb = BORDER_COLOR
            arr.line.fill.background()

    # Architecture Bottom Legend & Transparency Box
    leg_box = add_card(slide6, Inches(0.8), Inches(5.8), Inches(11.733), Inches(1.0), bg_color=CARD_BG_ALT)
    tx_leg = slide6.shapes.add_textbox(Inches(0.95), Inches(5.85), Inches(11.433), Inches(0.85))
    tf_leg = tx_leg.text_frame
    tf_leg.word_wrap = True

    p = tf_leg.paragraphs[0]
    p.text = "ARCHITECTURE TRANSPARENCY & IMPLEMENTATION AUDIT"
    p.font.name = "Arial"
    p.font.size = Pt(9.5)
    p.font.bold = True
    p.font.color.rgb = ACCENT_GREEN

    p = tf_leg.add_paragraph()
    p.text = (
        "• Prototype Foundation (Live): Complete React dashboard, FastAPI asynchronous backend, and demonstration exposure planner are fully functional.\n"
        "• Planned Machine Learning Components: The Scikit-learn training pipeline (train.py, predict.py) is architected with regression baselines; full historical training and live CPCB sensor API pipelines are marked for Round 2 implementation."
    )
    p.font.name = "Calibri"
    p.font.size = Pt(10)
    p.font.color.rgb = TEXT_MUTED
    p.space_before = Pt(3)

    add_footer(slide6, 6)

    slide6.notes_slide.notes_text_frame.text = (
        "SPEAKER SCRIPT — SLIDE 6 (SYSTEM ARCHITECTURE):\n"
        "Judges, our architecture is clean, decoupled, and transparent. We have avoided bloated dependencies in Round 1.\n\n"
        "The React 18 client connects over REST to our Python FastAPI backend. FastAPI provides high-throughput asynchronous request handling "
        "and strict Pydantic data schemas. Inside our data pipeline, we handle missing sensor values and construct temporal lag features.\n\n"
        "In our ML layer, we have scaffolded a Scikit-learn regression pipeline. To maintain complete academic honesty during judging, "
        "we clearly indicate that our frontend and backend services are active and running, while the live sensor API streaming and full model "
        "weight training are planned engineering milestones for subsequent rounds."
    )

    # ==========================================
    # SLIDE 7: TECH STACK & FEASIBILITY
    # ==========================================
    slide7 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide7)
    add_header(slide7, "Engineering Foundation", "Technology Stack & Scientific Feasibility",
               "A pragmatic, production-ready stack backed by rigorous baseline evaluation and data validation.")

    # Left: Tech Stack (Width 5.6")
    c_tech = add_card(slide7, Inches(0.8), Inches(1.85), Inches(5.6), Inches(4.9))
    tx_tech = slide7.shapes.add_textbox(Inches(0.95), Inches(2.0), Inches(5.3), Inches(4.6))
    tf_t = tx_tech.text_frame
    tf_t.word_wrap = True

    p = tf_t.paragraphs[0]
    p.text = "PROVEN, LIGHTWEIGHT TECHNOLOGY STACK"
    p.font.name = "Arial"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = ACCENT_CYAN

    stack_items = [
        ("Frontend: React.js & Vite", "Rapid compilation, modular UI components, minimal bundle size."),
        ("Styling & Viz: Tailwind CSS & Recharts", "Hardware-accelerated SVG charts, responsive dark environmental theme."),
        ("Backend: Python 3 & FastAPI", "Asynchronous endpoints, automatic OpenAPI documentation, clean data contracts."),
        ("Data & Analytics: Pandas & NumPy", "Vectorized time-series manipulation, rolling window calculation."),
        ("Proposed ML: Scikit-learn", "Transparent baseline regressors (RandomForest, GradientBoosting) with clear interpretability."),
        ("VCS & CI: Git & GitHub", "Clean version control, modular repository structure, branch isolation.")
    ]

    for title, desc in stack_items:
        p_item = tf_t.add_paragraph()
        p_item.text = f"• {title}: {desc}"
        p_item.font.name = "Calibri"
        p_item.font.size = Pt(10.5)
        p_item.font.color.rgb = TEXT_BODY
        p_item.space_before = Pt(5)

    # Right: Feasibility & Evaluation Rigor (Width 5.8")
    c_feas = add_card(slide7, Inches(6.7), Inches(1.85), Inches(5.833), Inches(4.9))
    tx_feas = slide7.shapes.add_textbox(Inches(6.85), Inches(2.0), Inches(5.533), Inches(4.6))
    tf_f = tx_feas.text_frame
    tf_f.word_wrap = True

    p = tf_f.paragraphs[0]
    p.text = "SCIENTIFIC FEASIBILITY & VALIDATION METHODOLOGY"
    p.font.name = "Arial"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = ACCENT_GREEN

    p = tf_f.add_paragraph()
    p.text = "Zero Fake Statistics — Strict Baseline Evaluation"
    p.font.name = "Arial"
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = TEXT_WHITE
    p.space_before = Pt(4)

    feas_points = [
        ("Data Availability Verification", "Historical CPCB sensor data is available across major urban monitoring stations. Weather reanalysis (temperature, wind, humidity) is verified via IMD and OpenWeather historical APIs."),
        ("Evaluation Against Baseline", "We do NOT present fabricated 99% accuracy claims. In time-series forecasting, models must outperform a 'Persistence Baseline' (yesterday's AQI = today's AQI) to prove true utility."),
        ("Standard Scientific Metrics", "Model evaluation will utilize Mean Absolute Error (MAE) and Root Mean Squared Error (RMSE) on chronological train/test splits, preventing data leakage."),
        ("Data Gap Handling", "In neighbourhoods lacking direct monitoring sensors, the system relies on spatial interpolation and explicit fallback notices rather than hallucinated estimates.")
    ]

    for title, desc in feas_points:
        p_pt = tf_f.add_paragraph()
        p_pt.text = f"• {title}:\n  {desc}"
        p_pt.font.name = "Calibri"
        p_pt.font.size = Pt(10.2)
        p_pt.font.color.rgb = TEXT_BODY
        p_pt.space_before = Pt(6)

    add_footer(slide7, 7)

    slide7.notes_slide.notes_text_frame.text = (
        "SPEAKER SCRIPT — SLIDE 7 (TECHNOLOGY STACK & FEASIBILITY):\n"
        "On Slide 7, we address engineering feasibility and academic rigor.\n\n"
        "Our stack combines React with Vite and Recharts on the frontend, and Python with FastAPI on the backend. "
        "FastAPI is fast, asynchronous, and beginner-friendly to explain in code reviews.\n\n"
        "More importantly, let's talk about our ML validation strategy. We refuse to invent fake 98% accuracy metrics. "
        "In environmental time-series, predicting air quality is hard because firecracker events are localized human anomalies. "
        "Our proposed methodology evaluates models strictly using Mean Absolute Error (MAE) and Root Mean Squared Error (RMSE) "
        "against a Persistence Baseline. If our model cannot beat the persistence baseline, it is not production-ready. "
        "That honest, data-centric approach is what sets AirPulse apart from generic AI prototypes."
    )

    # ==========================================
    # SLIDE 8: IMPACT & FUTURE SCOPE
    # ==========================================
    slide8 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide8)
    add_header(slide8, "Long-Term Vision", "Impact & Future Scope: Environmental Intelligence",
               "From festival episode forecasting to year-round urban health and municipal decision support.")

    # 2 Big Cards: Impact vs Roadmap
    col_w8 = Inches(5.72)
    col_h8 = Inches(3.8)
    y8 = Inches(1.85)

    # Left: Immediate Impact
    c_imp = add_card(slide8, Inches(0.8), y8, col_w8, col_h8)
    tx_imp = slide8.shapes.add_textbox(Inches(0.95), y8 + Inches(0.15), col_w8 - Inches(0.3), col_h8 - Inches(0.3))
    tf_i = tx_imp.text_frame
    tf_i.word_wrap = True

    p = tf_i.paragraphs[0]
    p.text = "REAL-WORLD IMPACT & BENEFICIARIES"
    p.font.name = "Arial"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = ACCENT_GREEN

    p = tf_i.add_paragraph()
    p.text = "Target Communities & Stakeholders"
    p.font.name = "Arial"
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = TEXT_WHITE
    p.space_before = Pt(4)

    p = tf_i.add_paragraph()
    p.text = (
        "• Vulnerable Citizens & Families: Early warnings help elderly residents, children, and asthma sufferers seal living quarters and reschedule morning walks before peak pollution.\n\n"
        "• Schools, Colleges & Sports Academies: Allows educational institutions to reschedule outdoor assemblies, physical training, and sporting fixtures to lower-exposure afternoon slots.\n\n"
        "• Outdoor Event Planners: Enables commercial and community festival organizers to evaluate venue exposure risks before finalizing schedules.\n\n"
        "• Environmental Literacy: Fosters proactive community awareness on the relationship between fireworks, weather inversion, and respiratory risk."
    )
    p.font.name = "Calibri"
    p.font.size = Pt(10.8)
    p.font.color.rgb = TEXT_BODY
    p.space_before = Pt(6)

    # Right: Future Scope
    c_fut = add_card(slide8, Inches(6.81), y8, col_w8, col_h8)
    tx_fut = slide8.shapes.add_textbox(Inches(6.96), y8 + Inches(0.15), col_w8 - Inches(0.3), col_h8 - Inches(0.3))
    tf_fu = tx_fut.text_frame
    tf_fu.word_wrap = True

    p = tf_fu.paragraphs[0]
    p.text = "FUTURE ROADMAP & STARTUP TRAJECTORY"
    p.font.name = "Arial"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = ACCENT_CYAN

    p = tf_fu.add_paragraph()
    p.text = "Scaling From Prototype to Enterprise"
    p.font.name = "Arial"
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = TEXT_WHITE
    p.space_before = Pt(4)

    p = tf_fu.add_paragraph()
    p.text = (
        "• Validated Advanced ML Models: Train XGBoost, Temporal Convolutional Networks (TCN), or LSTMs on multi-year festival and meteorological datasets.\n\n"
        "• Satellite & Hyperlocal IoT Mesh: Integrate Sentinel-5P satellite aerosol data and low-cost hyperlocal sensor meshes for sub-kilometre precision.\n\n"
        "• Pan-India Urban Expansion: Broaden coverage to other industrial pollution hotspots across the Indo-Gangetic plain (Kanpur, Lucknow, Patna, Kolkata).\n\n"
        "• Smart Delivery Channels: Automated WhatsApp and push notification alerts for high-risk hourly threshold breaches."
    )
    p.font.name = "Calibri"
    p.font.size = Pt(10.8)
    p.font.color.rgb = TEXT_BODY
    p.space_before = Pt(6)

    # Concluding Banner at Bottom
    c_tag = add_card(slide8, Inches(0.8), Inches(5.8), Inches(11.733), Inches(1.0), bg_color=CARD_BG_ALT, border_color=ACCENT_GREEN)
    tx_tag = slide8.shapes.add_textbox(Inches(1.0), Inches(5.9), Inches(11.333), Inches(0.8))
    tf_tg = tx_tag.text_frame
    tf_tg.word_wrap = True
    p = tf_tg.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    p.text = "AirPulse — Predict Pollution. Understand Exposure. Make Better Decisions."
    p.font.name = "Arial"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = ACCENT_GREEN

    p = tf_tg.add_paragraph()
    p.alignment = PP_ALIGN.CENTER
    p.text = "Thank you! We welcome questions, architectural feedback, and mentor evaluations."
    p.font.name = "Calibri"
    p.font.size = Pt(11.5)
    p.font.color.rgb = TEXT_WHITE
    p.space_before = Pt(3)

    add_footer(slide8, 8)

    slide8.notes_slide.notes_text_frame.text = (
        "SPEAKER SCRIPT — SLIDE 8 (IMPACT & FUTURE SCOPE):\n"
        "In conclusion, AirPulse is more than a hackathon prototype—it is a foundation for real-world environmental intelligence.\n\n"
        "Our immediate beneficiaries are the citizens, schools, running clubs, and event organizers who need advance warning to protect respiratory health. "
        "In subsequent rounds and our long-term startup roadmap, we plan to validate advanced ML models like Temporal Convolutional Networks, "
        "integrate satellite aerosol data from Sentinel-5P, expand coverage across northern Indian cities, and deploy automated WhatsApp smart alerts.\n\n"
        "We believe that clean air starts with clear awareness. With AirPulse, we: 'Predict Pollution. Understand Exposure. Make Better Decisions.'\n"
        "Thank you so much, judges. We are now eager to take your questions!"
    )

    # Output path
    os.makedirs("presentation", exist_ok=True)
    output_path = os.path.abspath(os.path.join("presentation", "AirPulse_Hackathon_Round1.pptx"))
    prs.save(output_path)
    print(f"Presentation saved successfully to: {output_path}")

if __name__ == "__main__":
    build_presentation()
