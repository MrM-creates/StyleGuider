export const STYLES = [
  {
    "schema_version": "1.0.0",
    "object_type": "style_family_example",
    "style_family": {
      "id": "minimal_swiss",
      "name": "Minimal Swiss",
      "summary": "Sachlich, klar und rasterorientiert. Für Marken, die Präzision, Ordnung und Vertrauen kommunizieren sollen.",
      "status": "draft_mvp",
      "brand_keywords": [
        "clarity",
        "precision",
        "trust",
        "order",
        "restraint"
      ],
      "suitable_for": [
        "consulting",
        "architecture",
        "b2b",
        "premium_tech",
        "culture_institutions"
      ],
      "not_recommended_for": [
        "childrens_brands",
        "highly_playful_campaigns",
        "youth_event_promos"
      ]
    },
    "design_axes": {
      "emotionality": 0.2,
      "expressiveness": 0.2,
      "boldness": 0.3,
      "luxury": 0.45,
      "warmth": 0.25,
      "playfulness": 0.05,
      "technicality": 0.8
    },
    "tokens": {
      "color_roles": {
        "background": "#FAFAF8",
        "surface": "#FFFFFF",
        "text_primary": "#111111",
        "text_secondary": "#4B5563",
        "primary": "#0F4C81",
        "accent": "#D97706",
        "border": "#D1D5DB",
        "focus": "#0F4C81",
        "success": "#0F766E",
        "warning": "#B45309",
        "error": "#B91C1C"
      },
      "typography_roles": {
        "display": {
          "family": "Inter",
          "weight": 700,
          "tracking": -0.02
        },
        "heading": {
          "family": "Inter",
          "weight": 600,
          "tracking": -0.01
        },
        "body": {
          "family": "Inter",
          "weight": 400,
          "line_height": 1.6
        },
        "label": {
          "family": "Inter",
          "weight": 500,
          "letter_spacing": 0.01
        },
        "caption": {
          "family": "Inter",
          "weight": 400,
          "line_height": 1.4
        }
      },
      "spacing_scale": {
        "base_unit": 4,
        "steps_px": [
          4,
          8,
          12,
          16,
          24,
          32,
          48,
          64,
          96
        ],
        "density": "medium"
      },
      "shape_scale": {
        "radius_px": [
          0,
          2,
          4,
          8
        ],
        "default_radius": 4,
        "corner_style": "sharp_softened"
      },
      "elevation_scale": {
        "shadow_levels": [
          "none",
          "xs"
        ],
        "default_level": "none"
      }
    },
    "channel_rules": {
      "website": {
        "grid": "12-column",
        "hero_density": "medium",
        "button_style": "solid_primary_or_outline"
      },
      "flyer": {
        "layout_bias": "typography_first",
        "image_ratio_preference": [
          "4:5",
          "3:4"
        ]
      },
      "business_card": {
        "front_bias": "minimal_identity",
        "back_bias": "contact_details"
      },
      "social": {
        "text_overlay": "minimal",
        "logo_placement": "subtle"
      }
    },
    "template_specs": {
      "homepage": {
        "sections": [
          "hero",
          "services",
          "trust_markers",
          "contact_cta"
        ],
        "tone": "precise"
      },
      "flyer_a5": {
        "headline_ratio": "large",
        "body_density": "medium",
        "cta_count": 1
      },
      "business_card": {
        "orientation": "horizontal",
        "whitespace": "high"
      },
      "one_pager_pdf": {
        "section_count": 4,
        "charts_allowed": false
      }
    },
    "export_bundle": {
      "design_tokens_json": true,
      "css_variables": true,
      "brand_guide_pdf": true,
      "print_spec_sheet": true,
      "template_specs_json": true,
      "ui_code_agent_prompt": true,
      "brand_copy_agent_prompt": true,
      "image_gen_style_pack": true
    },
    "dos": [
      "Use strong alignment and restrained color.",
      "Prefer borders over decorative shadows.",
      "Keep CTA hierarchy unambiguous."
    ],
    "donts": [
      "Do not use multiple loud accents.",
      "Do not round everything.",
      "Do not mix decorative fonts into body copy."
    ],
    "governance": {
      "review_required": true,
      "accessibility_target": "WCAG 2.2 AA",
      "print_guidance": "Use PDF/X-4 for press-ready export where applicable.",
      "updated_at": "2026-03-20"
    }
  },
  {
    "schema_version": "1.0.0",
    "object_type": "style_family_example",
    "style_family": {
      "id": "modern_editorial",
      "name": "Modern Editorial",
      "summary": "Typografisch stark, großzügig und bildgeführt. Für Marken mit kulturellem, fotografischem oder kuratorischem Anspruch.",
      "status": "draft_mvp",
      "brand_keywords": [
        "editorial",
        "curated",
        "sophisticated",
        "visual storytelling",
        "space"
      ],
      "suitable_for": [
        "photography",
        "fashion",
        "art",
        "interior",
        "personal_brand"
      ],
      "not_recommended_for": [
        "feature_dense_dashboards",
        "hard_sell_landingpages"
      ]
    },
    "design_axes": {
      "emotionality": 0.55,
      "expressiveness": 0.45,
      "boldness": 0.35,
      "luxury": 0.65,
      "warmth": 0.35,
      "playfulness": 0.1,
      "technicality": 0.3
    },
    "tokens": {
      "color_roles": {
        "background": "#F7F5F1",
        "surface": "#FFFFFF",
        "text_primary": "#171717",
        "text_secondary": "#525252",
        "primary": "#1F2937",
        "accent": "#8B5E3C",
        "border": "#E5E7EB",
        "focus": "#1F2937",
        "success": "#166534",
        "warning": "#A16207",
        "error": "#991B1B"
      },
      "typography_roles": {
        "display": {
          "family": "Cormorant Garamond",
          "weight": 600,
          "tracking": -0.015
        },
        "heading": {
          "family": "Inter",
          "weight": 600,
          "tracking": -0.01
        },
        "body": {
          "family": "Inter",
          "weight": 400,
          "line_height": 1.7
        },
        "label": {
          "family": "Inter",
          "weight": 500,
          "letter_spacing": 0.03
        },
        "caption": {
          "family": "Inter",
          "weight": 400,
          "line_height": 1.5
        }
      },
      "spacing_scale": {
        "base_unit": 4,
        "steps_px": [
          4,
          8,
          12,
          16,
          24,
          32,
          48,
          64,
          96
        ],
        "density": "airy"
      },
      "shape_scale": {
        "radius_px": [
          0,
          2,
          4
        ],
        "default_radius": 2,
        "corner_style": "refined"
      },
      "elevation_scale": {
        "shadow_levels": [
          "none",
          "xs"
        ],
        "default_level": "none"
      }
    },
    "channel_rules": {
      "website": {
        "grid": "12-column",
        "hero_density": "airy",
        "button_style": "quiet"
      },
      "flyer": {
        "layout_bias": "image_and_typography",
        "image_ratio_preference": [
          "2:3",
          "4:5"
        ]
      },
      "business_card": {
        "front_bias": "name_title",
        "back_bias": "minimal_contact"
      },
      "social": {
        "text_overlay": "editorial",
        "logo_placement": "very_subtle"
      }
    },
    "template_specs": {
      "homepage": {
        "sections": [
          "hero",
          "portfolio",
          "about",
          "contact"
        ],
        "tone": "curated"
      },
      "flyer_a5": {
        "headline_ratio": "very_large",
        "body_density": "low",
        "cta_count": 1
      },
      "business_card": {
        "orientation": "horizontal",
        "whitespace": "very_high"
      },
      "lookbook_pdf": {
        "section_count": 6,
        "image_weight": "high"
      }
    },
    "export_bundle": {
      "design_tokens_json": true,
      "css_variables": true,
      "brand_guide_pdf": true,
      "print_spec_sheet": true,
      "template_specs_json": true,
      "ui_code_agent_prompt": true,
      "brand_copy_agent_prompt": true,
      "image_gen_style_pack": true
    },
    "dos": [
      "Let typography and imagery lead.",
      "Use generous whitespace.",
      "Keep interface chrome understated."
    ],
    "donts": [
      "Do not overload with CTA colors.",
      "Do not turn it into dashboard UI.",
      "Do not use cheap luxury clichés."
    ],
    "governance": {
      "review_required": true,
      "accessibility_target": "WCAG 2.2 AA",
      "print_guidance": "Use PDF/X-4 for press-ready export where applicable.",
      "updated_at": "2026-03-20"
    }
  },
  {
    "schema_version": "1.0.0",
    "object_type": "style_family_example",
    "style_family": {
      "id": "warm_human",
      "name": "Warm Human",
      "summary": "Nahbar, weich und vertrauensbildend. Für menschliche, beratende oder familiennahe Marken.",
      "status": "draft_mvp",
      "brand_keywords": [
        "friendly",
        "approachable",
        "trust",
        "softness",
        "care"
      ],
      "suitable_for": [
        "coaching",
        "health",
        "education",
        "family_services",
        "local_business"
      ],
      "not_recommended_for": [
        "cyber_security",
        "high_finance",
        "industrial_b2b"
      ]
    },
    "design_axes": {
      "emotionality": 0.75,
      "expressiveness": 0.3,
      "boldness": 0.2,
      "luxury": 0.25,
      "warmth": 0.9,
      "playfulness": 0.35,
      "technicality": 0.1
    },
    "tokens": {
      "color_roles": {
        "background": "#FFF8F4",
        "surface": "#FFFFFF",
        "text_primary": "#3B2F2F",
        "text_secondary": "#6B5B5B",
        "primary": "#E58E73",
        "accent": "#9BC4BC",
        "border": "#F0D8CF",
        "focus": "#C96E57",
        "success": "#3F8F76",
        "warning": "#C27C2C",
        "error": "#B85C5C"
      },
      "typography_roles": {
        "display": {
          "family": "Outfit",
          "weight": 700,
          "tracking": -0.01
        },
        "heading": {
          "family": "Outfit",
          "weight": 600,
          "tracking": -0.005
        },
        "body": {
          "family": "Inter",
          "weight": 400,
          "line_height": 1.65
        },
        "label": {
          "family": "Inter",
          "weight": 500,
          "letter_spacing": 0.01
        },
        "caption": {
          "family": "Inter",
          "weight": 400,
          "line_height": 1.45
        }
      },
      "spacing_scale": {
        "base_unit": 4,
        "steps_px": [
          4,
          8,
          12,
          16,
          24,
          32,
          48,
          64,
          96
        ],
        "density": "comfortable"
      },
      "shape_scale": {
        "radius_px": [
          8,
          12,
          16,
          24
        ],
        "default_radius": 16,
        "corner_style": "soft"
      },
      "elevation_scale": {
        "shadow_levels": [
          "none",
          "xs",
          "sm"
        ],
        "default_level": "xs"
      }
    },
    "channel_rules": {
      "website": {
        "grid": "12-column",
        "hero_density": "comfortable",
        "button_style": "soft_solid"
      },
      "flyer": {
        "layout_bias": "friendly_clarity",
        "image_ratio_preference": [
          "4:5",
          "1:1"
        ]
      },
      "business_card": {
        "front_bias": "warm_identity",
        "back_bias": "simple_contact"
      },
      "social": {
        "text_overlay": "friendly",
        "logo_placement": "visible_but_soft"
      }
    },
    "template_specs": {
      "homepage": {
        "sections": [
          "hero",
          "benefits",
          "about",
          "faq",
          "contact"
        ],
        "tone": "empathetic"
      },
      "flyer_a5": {
        "headline_ratio": "large",
        "body_density": "medium",
        "cta_count": 1
      },
      "business_card": {
        "orientation": "horizontal",
        "whitespace": "medium_high"
      },
      "service_pdf": {
        "section_count": 5,
        "image_weight": "medium"
      }
    },
    "export_bundle": {
      "design_tokens_json": true,
      "css_variables": true,
      "brand_guide_pdf": true,
      "print_spec_sheet": true,
      "template_specs_json": true,
      "ui_code_agent_prompt": true,
      "brand_copy_agent_prompt": true,
      "image_gen_style_pack": true
    },
    "dos": [
      "Use warm contrast, not weak contrast.",
      "Keep forms soft but readable.",
      "Support trust with clear information design."
    ],
    "donts": [
      "Do not pastel everything equally.",
      "Do not let shadows replace hierarchy.",
      "Do not reduce contrast for the sake of softness."
    ],
    "governance": {
      "review_required": true,
      "accessibility_target": "WCAG 2.2 AA",
      "print_guidance": "Use PDF/X-4 for press-ready export where applicable.",
      "updated_at": "2026-03-20"
    }
  },
  {
    "schema_version": "1.0.0",
    "object_type": "style_family_example",
    "style_family": {
      "id": "bold_startup",
      "name": "Bold Startup",
      "summary": "Kontraststark, digital und aktivierend. Für Produkte, die Tempo, Relevanz und klare Conversion brauchen.",
      "status": "draft_mvp",
      "brand_keywords": [
        "energy",
        "momentum",
        "clarity",
        "conversion",
        "modernity"
      ],
      "suitable_for": [
        "saas",
        "apps",
        "digital_services",
        "startups",
        "product_marketing"
      ],
      "not_recommended_for": [
        "heritage_brands",
        "luxury_hospitality",
        "artisan_craft"
      ]
    },
    "design_axes": {
      "emotionality": 0.35,
      "expressiveness": 0.6,
      "boldness": 0.85,
      "luxury": 0.15,
      "warmth": 0.2,
      "playfulness": 0.25,
      "technicality": 0.75
    },
    "tokens": {
      "color_roles": {
        "background": "#0B1020",
        "surface": "#111827",
        "text_primary": "#F9FAFB",
        "text_secondary": "#CBD5E1",
        "primary": "#7C3AED",
        "accent": "#22C55E",
        "border": "#334155",
        "focus": "#A78BFA",
        "success": "#22C55E",
        "warning": "#F59E0B",
        "error": "#F43F5E"
      },
      "typography_roles": {
        "display": {
          "family": "Space Grotesk",
          "weight": 700,
          "tracking": -0.02
        },
        "heading": {
          "family": "Space Grotesk",
          "weight": 600,
          "tracking": -0.01
        },
        "body": {
          "family": "Inter",
          "weight": 400,
          "line_height": 1.6
        },
        "label": {
          "family": "Inter",
          "weight": 600,
          "letter_spacing": 0.02
        },
        "caption": {
          "family": "Inter",
          "weight": 400,
          "line_height": 1.4
        }
      },
      "spacing_scale": {
        "base_unit": 4,
        "steps_px": [
          4,
          8,
          12,
          16,
          24,
          32,
          48,
          64,
          96
        ],
        "density": "compact_comfortable"
      },
      "shape_scale": {
        "radius_px": [
          8,
          12,
          16
        ],
        "default_radius": 12,
        "corner_style": "clean_modern"
      },
      "elevation_scale": {
        "shadow_levels": [
          "none",
          "xs",
          "sm",
          "md"
        ],
        "default_level": "sm"
      }
    },
    "channel_rules": {
      "website": {
        "grid": "12-column",
        "hero_density": "high",
        "button_style": "strong_primary_secondary"
      },
      "flyer": {
        "layout_bias": "message_first",
        "image_ratio_preference": [
          "16:9",
          "4:5"
        ]
      },
      "business_card": {
        "front_bias": "bold_mark",
        "back_bias": "minimal_contact"
      },
      "social": {
        "text_overlay": "assertive",
        "logo_placement": "visible"
      }
    },
    "template_specs": {
      "landingpage": {
        "sections": [
          "hero",
          "proof",
          "features",
          "pricing",
          "faq",
          "cta"
        ],
        "tone": "assertive"
      },
      "flyer_a4": {
        "headline_ratio": "very_large",
        "body_density": "medium",
        "cta_count": 2
      },
      "business_card": {
        "orientation": "vertical",
        "whitespace": "medium"
      },
      "pitchdeck": {
        "slide_bias": "headline_driven",
        "chart_style": "high_contrast"
      }
    },
    "export_bundle": {
      "design_tokens_json": true,
      "css_variables": true,
      "brand_guide_pdf": true,
      "print_spec_sheet": true,
      "template_specs_json": true,
      "ui_code_agent_prompt": true,
      "brand_copy_agent_prompt": true,
      "image_gen_style_pack": true
    },
    "dos": [
      "Use decisive hierarchy and clear CTA states.",
      "Support dark UI with strict contrast control.",
      "Keep modules reusable."
    ],
    "donts": [
      "Do not make every color a CTA.",
      "Do not confuse noise with energy.",
      "Do not ignore form and focus states."
    ],
    "governance": {
      "review_required": true,
      "accessibility_target": "WCAG 2.2 AA",
      "print_guidance": "Use PDF/X-4 for press-ready export where applicable.",
      "updated_at": "2026-03-20"
    }
  },
  {
    "schema_version": "1.0.0",
    "object_type": "style_family_example",
    "style_family": {
      "id": "premium_luxury",
      "name": "Premium Luxury",
      "summary": "Reduziert, ruhig und hochwertig. Für Marken, die Exklusivität über Kontrolle statt Lautstärke kommunizieren.",
      "status": "draft_mvp",
      "brand_keywords": [
        "exclusivity",
        "restraint",
        "materiality",
        "calm",
        "value"
      ],
      "suitable_for": [
        "fine_art",
        "interior",
        "beauty",
        "hospitality",
        "high_end_services"
      ],
      "not_recommended_for": [
        "mass_discount_retail",
        "kids_brands",
        "youth_startup_hype"
      ]
    },
    "design_axes": {
      "emotionality": 0.45,
      "expressiveness": 0.2,
      "boldness": 0.15,
      "luxury": 0.95,
      "warmth": 0.35,
      "playfulness": 0.02,
      "technicality": 0.15
    },
    "tokens": {
      "color_roles": {
        "background": "#F8F5F0",
        "surface": "#FFFFFF",
        "text_primary": "#181512",
        "text_secondary": "#5B524B",
        "primary": "#2C221C",
        "accent": "#A67C52",
        "border": "#DED3C7",
        "focus": "#7A5C3A",
        "success": "#4D7C67",
        "warning": "#A16207",
        "error": "#8C3A3A"
      },
      "typography_roles": {
        "display": {
          "family": "Cormorant Garamond",
          "weight": 600,
          "tracking": -0.02
        },
        "heading": {
          "family": "Inter",
          "weight": 500,
          "tracking": 0
        },
        "body": {
          "family": "Inter",
          "weight": 400,
          "line_height": 1.75
        },
        "label": {
          "family": "Inter",
          "weight": 500,
          "letter_spacing": 0.05
        },
        "caption": {
          "family": "Inter",
          "weight": 400,
          "line_height": 1.5
        }
      },
      "spacing_scale": {
        "base_unit": 4,
        "steps_px": [
          4,
          8,
          12,
          16,
          24,
          32,
          48,
          64,
          96
        ],
        "density": "airy"
      },
      "shape_scale": {
        "radius_px": [
          0,
          2,
          4,
          8
        ],
        "default_radius": 4,
        "corner_style": "understated"
      },
      "elevation_scale": {
        "shadow_levels": [
          "none",
          "xs"
        ],
        "default_level": "none"
      }
    },
    "channel_rules": {
      "website": {
        "grid": "12-column",
        "hero_density": "airy",
        "button_style": "quiet_refined"
      },
      "flyer": {
        "layout_bias": "whitespace_and_materiality",
        "image_ratio_preference": [
          "4:5",
          "2:3"
        ]
      },
      "business_card": {
        "front_bias": "name_and_mark",
        "back_bias": "minimal_contact"
      },
      "social": {
        "text_overlay": "minimal",
        "logo_placement": "small"
      }
    },
    "template_specs": {
      "homepage": {
        "sections": [
          "hero",
          "collections",
          "story",
          "contact"
        ],
        "tone": "refined"
      },
      "invitation_card": {
        "headline_ratio": "large",
        "body_density": "low",
        "cta_count": 0
      },
      "business_card": {
        "orientation": "horizontal",
        "whitespace": "very_high"
      },
      "portfolio_pdf": {
        "section_count": 5,
        "image_weight": "high"
      }
    },
    "export_bundle": {
      "design_tokens_json": true,
      "css_variables": true,
      "brand_guide_pdf": true,
      "print_spec_sheet": true,
      "template_specs_json": true,
      "ui_code_agent_prompt": true,
      "brand_copy_agent_prompt": true,
      "image_gen_style_pack": true
    },
    "dos": [
      "Use restraint, proportion and material cues.",
      "Let whitespace carry value.",
      "Keep accents rare and deliberate."
    ],
    "donts": [
      "Do not fake luxury with random gold.",
      "Do not clutter interfaces.",
      "Do not over-round forms."
    ],
    "governance": {
      "review_required": true,
      "accessibility_target": "WCAG 2.2 AA",
      "print_guidance": "Use PDF/X-4 for press-ready export where applicable.",
      "updated_at": "2026-03-20"
    }
  },
  {
    "schema_version": "1.0.0",
    "object_type": "style_family_example",
    "style_family": {
      "id": "creative_playful",
      "name": "Creative Playful",
      "summary": "Lebendig, charakterstark und markant. Für Marken, die Energie und Unverwechselbarkeit suchen, ohne ins Chaos zu kippen.",
      "status": "draft_mvp",
      "brand_keywords": [
        "energy",
        "distinctiveness",
        "creativity",
        "movement",
        "joy"
      ],
      "suitable_for": [
        "creative_studios",
        "events",
        "lifestyle",
        "consumer_brands",
        "family_fun"
      ],
      "not_recommended_for": [
        "formal_b2b",
        "regulatory_comms",
        "serious_medical_brands"
      ]
    },
    "design_axes": {
      "emotionality": 0.65,
      "expressiveness": 0.9,
      "boldness": 0.7,
      "luxury": 0.1,
      "warmth": 0.55,
      "playfulness": 0.95,
      "technicality": 0.2
    },
    "tokens": {
      "color_roles": {
        "background": "#FFF9F1",
        "surface": "#FFFFFF",
        "text_primary": "#1F2937",
        "text_secondary": "#475569",
        "primary": "#FF6B35",
        "accent": "#3A86FF",
        "border": "#FFD8C2",
        "focus": "#FB5607",
        "success": "#2A9D8F",
        "warning": "#F4A261",
        "error": "#E63946"
      },
      "typography_roles": {
        "display": {
          "family": "Space Grotesk",
          "weight": 700,
          "tracking": -0.025
        },
        "heading": {
          "family": "Space Grotesk",
          "weight": 600,
          "tracking": -0.01
        },
        "body": {
          "family": "Inter",
          "weight": 400,
          "line_height": 1.6
        },
        "label": {
          "family": "Inter",
          "weight": 600,
          "letter_spacing": 0.02
        },
        "caption": {
          "family": "Inter",
          "weight": 400,
          "line_height": 1.4
        }
      },
      "spacing_scale": {
        "base_unit": 4,
        "steps_px": [
          4,
          8,
          12,
          16,
          24,
          32,
          48,
          64,
          96
        ],
        "density": "dynamic"
      },
      "shape_scale": {
        "radius_px": [
          12,
          16,
          24,
          32
        ],
        "default_radius": 16,
        "corner_style": "playful_controlled"
      },
      "elevation_scale": {
        "shadow_levels": [
          "none",
          "xs",
          "sm",
          "md"
        ],
        "default_level": "sm"
      }
    },
    "channel_rules": {
      "website": {
        "grid": "12-column",
        "hero_density": "high",
        "button_style": "energetic"
      },
      "flyer": {
        "layout_bias": "headline_and_shape_driven",
        "image_ratio_preference": [
          "1:1",
          "4:5"
        ]
      },
      "business_card": {
        "front_bias": "brand_energy",
        "back_bias": "simple_contact"
      },
      "social": {
        "text_overlay": "bold",
        "logo_placement": "visible"
      }
    },
    "template_specs": {
      "homepage": {
        "sections": [
          "hero",
          "work",
          "services",
          "cta"
        ],
        "tone": "vivid"
      },
      "event_flyer": {
        "headline_ratio": "very_large",
        "body_density": "medium",
        "cta_count": 2
      },
      "business_card": {
        "orientation": "vertical",
        "whitespace": "medium"
      },
      "social_post": {
        "overlay_mode": "strong",
        "brand_mark_weight": "medium"
      }
    },
    "export_bundle": {
      "design_tokens_json": true,
      "css_variables": true,
      "brand_guide_pdf": true,
      "print_spec_sheet": true,
      "template_specs_json": true,
      "ui_code_agent_prompt": true,
      "brand_copy_agent_prompt": true,
      "image_gen_style_pack": true
    },
    "dos": [
      "Be expressive with rules, not with randomness.",
      "Use one dominant playful move at a time.",
      "Keep body text calm."
    ],
    "donts": [
      "Do not turn every element into a visual stunt.",
      "Do not break accessibility for fun.",
      "Do not mix too many signature colors."
    ],
    "governance": {
      "review_required": true,
      "accessibility_target": "WCAG 2.2 AA",
      "print_guidance": "Use PDF/X-4 for press-ready export where applicable.",
      "updated_at": "2026-03-20"
    }
  },
  {
    "schema_version": "1.0.0",
    "object_type": "style_family_example",
    "style_family": {
      "id": "natural_organic",
      "name": "Natural Organic",
      "summary": "Erdig, ruhig und glaubwürdig. Für Marken mit Nachhaltigkeits-, Food-, Natur- oder Wellbeing-Fokus.",
      "status": "draft_mvp",
      "brand_keywords": [
        "authenticity",
        "grounding",
        "nature",
        "calm",
        "trust"
      ],
      "suitable_for": [
        "sustainability",
        "food",
        "wellbeing",
        "craft",
        "nature_brands"
      ],
      "not_recommended_for": [
        "high_tech_saas",
        "financial_trading",
        "nightlife_events"
      ]
    },
    "design_axes": {
      "emotionality": 0.6,
      "expressiveness": 0.25,
      "boldness": 0.15,
      "luxury": 0.25,
      "warmth": 0.7,
      "playfulness": 0.15,
      "technicality": 0.05
    },
    "tokens": {
      "color_roles": {
        "background": "#F6F3EA",
        "surface": "#FFFDF8",
        "text_primary": "#2E2A24",
        "text_secondary": "#5F5A53",
        "primary": "#6B7A52",
        "accent": "#B08968",
        "border": "#DDD5C8",
        "focus": "#556B2F",
        "success": "#4F772D",
        "warning": "#BC6C25",
        "error": "#9C4A3C"
      },
      "typography_roles": {
        "display": {
          "family": "Fraunces",
          "weight": 600,
          "tracking": -0.015
        },
        "heading": {
          "family": "Inter",
          "weight": 600,
          "tracking": -0.005
        },
        "body": {
          "family": "Inter",
          "weight": 400,
          "line_height": 1.7
        },
        "label": {
          "family": "Inter",
          "weight": 500,
          "letter_spacing": 0.02
        },
        "caption": {
          "family": "Inter",
          "weight": 400,
          "line_height": 1.45
        }
      },
      "spacing_scale": {
        "base_unit": 4,
        "steps_px": [
          4,
          8,
          12,
          16,
          24,
          32,
          48,
          64,
          96
        ],
        "density": "comfortable"
      },
      "shape_scale": {
        "radius_px": [
          6,
          10,
          14,
          20
        ],
        "default_radius": 10,
        "corner_style": "soft_natural"
      },
      "elevation_scale": {
        "shadow_levels": [
          "none",
          "xs",
          "sm"
        ],
        "default_level": "xs"
      }
    },
    "channel_rules": {
      "website": {
        "grid": "12-column",
        "hero_density": "comfortable",
        "button_style": "calm_solid_or_outline"
      },
      "flyer": {
        "layout_bias": "texture_and_story",
        "image_ratio_preference": [
          "4:5",
          "3:4"
        ]
      },
      "business_card": {
        "front_bias": "crafted_identity",
        "back_bias": "clean_contact"
      },
      "social": {
        "text_overlay": "light",
        "logo_placement": "subtle"
      }
    },
    "template_specs": {
      "homepage": {
        "sections": [
          "hero",
          "values",
          "products",
          "story",
          "contact"
        ],
        "tone": "grounded"
      },
      "product_flyer": {
        "headline_ratio": "large",
        "body_density": "medium",
        "cta_count": 1
      },
      "business_card": {
        "orientation": "horizontal",
        "whitespace": "medium_high"
      },
      "brand_story_pdf": {
        "section_count": 5,
        "image_weight": "medium_high"
      }
    },
    "export_bundle": {
      "design_tokens_json": true,
      "css_variables": true,
      "brand_guide_pdf": true,
      "print_spec_sheet": true,
      "template_specs_json": true,
      "ui_code_agent_prompt": true,
      "brand_copy_agent_prompt": true,
      "image_gen_style_pack": true
    },
    "dos": [
      "Use materiality and calm contrast.",
      "Keep palettes earthy but structured.",
      "Support trust with clean information design."
    ],
    "donts": [
      "Do not lean on eco clichés alone.",
      "Do not make everything beige.",
      "Do not sacrifice legibility for softness."
    ],
    "governance": {
      "review_required": true,
      "accessibility_target": "WCAG 2.2 AA",
      "print_guidance": "Use PDF/X-4 for press-ready export where applicable.",
      "updated_at": "2026-03-20"
    }
  }
];