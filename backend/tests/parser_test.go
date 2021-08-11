package utils_test

import (
	"testing"

	"github.com/go-test/deep"

	. "github.com/Luukuton/rulebook/backend/types"
	. "github.com/Luukuton/rulebook/backend/utils"
)

func TestParseTextMalformedInput(t *testing.T){
	got := ParseTextToRulebook("")
	want := &Rulebook{Chapters: []Chapter{}}

	if diff := deep.Equal(got, want); diff != nil {
			t.Errorf("rulebooks did not match. diff (got, want): %s", diff)
	}
}

func TestParseText(t *testing.T){
    got := ParseTextToRulebook("testdata/rulebook_test_data.txt")
    want := testRulebook

    if diff := deep.Equal(got, want); diff != nil {
        t.Errorf("rulebooks did not match. diff (got, want): %s", diff)
    }
}

func TestParseTextWithMalformedHeaderFooter(t *testing.T){
	got := ParseTextToRulebook("testdata/rulebook_test_data_malformed_extra.txt")
	want := testRulebook

	if diff := deep.Equal(got, want); diff != nil {
			t.Errorf("rulebooks did not match. diff (got, want): %s", diff)
	}
}

func TestParseTextWithOnlyRulesr(t *testing.T){
	got := ParseTextToRulebook("testdata/rulebook_test_data_only_rules.txt")
	want := testRulebook

	if diff := deep.Equal(got, want); diff != nil {
			t.Errorf("rulebooks did not match. diff (got, want): %s", diff)
	}
}

func TestParseJSON(t *testing.T){
	got := ParseJSON("testdata/rulebook_test_data.json")
	want := testRulebook

	if diff := deep.Equal(got, want); diff != nil {
		t.Errorf("rulebooks did not match. diff (got, want): %s", diff)
	}
}

var testRulebook = &Rulebook {
	Chapters: []Chapter {
		{
			ID: 1,
			Title: "Game Concepts",
			Subchapters: []Subchapter {
				{
					ID: 100,
					Title: "Offence",
					Rules: []Rule {
						{
							ID: 1,
							Content: "Always try to attack.",
							Subrules: []Subrule {
								{
									ID: "a",
									Content: "Except when defending. See rule 101.1.",
								},
								{
									ID: "b",
									Content: "Except when you have lost.",
								},
							},
						},
						{
							ID: 2,
							Content: "Each and every attack has to be at full power.",
							Subrules: []Subrule {
								{
									ID: "a",
									Content: "Full power as in 100% of your power, no less.",
								},
								{
									ID: "b",
									Content: "Power can be more than 100%.",
								},
							},
						},
					},
				},
				{
					ID: 101,
					Title: "Defence",
					Rules: []Rule {
						{
							ID: 1,
							Content: "Always defend if you're being attacked.",
							Subrules: []Subrule {},
						},
						{
							ID: 2,
							Content: "Defending does not have to be at full power.",
							Subrules: []Subrule {
								{
									ID: "a",
									Content: "It has to be more than 0%.",
								},
							},
						},
					},
				},
			},
		},
		{
			ID: 2,
			Title: "Types",
			Subchapters: []Subchapter {
				{
					ID: 200,
					Title: "Fairies",
					Rules: []Rule {
						{
							ID: 1,
							Content: "Fairies are good at offence.",
							Subrules: []Subrule {
								{
									ID: "a",
									Content: "They should be used for offence, but it's not forced. See rule 100.",
								},
							},
						},
						{
							ID: 2,
							Content: "One cannot command more than 500 fairies at the same time.",
							Subrules: []Subrule {
								{
									ID: "a",
									Content: "Nor less than 0.\nExample: 232 fairies.",
								},
							},
						},
					},
				},
				{
					ID: 201,
					Title: "Dragons",
					Rules: []Rule {
						{
							ID: 1,
							Content: "Dragons are good at defence.",
							Subrules: []Subrule {
								{
									ID: "a",
									Content: "They should be used for defence, but it's not forced. See rule 101.2a.",
								},
							},
						},
						{
							ID: 2,
							Content: "One cannot command more than 100 dragons at the same time.\nJust some text after line break",
							Subrules: []Subrule {
								{
									ID: "a",
									Content: "Nor less than 0.",
								},
							},
						},
					},
				},
			},
		},
	},
}

