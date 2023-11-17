---
title: Markdown Slide Layouts
order: 7
sidebar_position: 7
---

# Markdown Slide Layouts

Spectacle supports a number of layout containers for use in your Markdown slides. These containers are designed to enable more complex layouts previously not doable in Markdown without the usage of importing JSX elements into MDX.

Spectacle uses `---` (three dashes) to delimit each slide in a Markdown file. Spectacle adds supports for a JSON-based configuration object with the slide delimiter in your Markdown file. This configuration object is used to define the layout of the slide. Currently, two types of layouts are support are `center` and `columns`.

## Columns Layout

The columns layout is used to create a two-column layout. The columns layout is defined by the following JSON object:

```json
{ "layout" : "columns" }
```

![Column Layout Example](https://res.cloudinary.com/formidablelabs/image/upload/c_scale,w_600/v1700171469/spectacle-assets/Screenshot_2023-11-16_at_3.49.29_PM.png)

```md

--- { "layout" : "columns" }

::section

![Gastly](gastly.png)

::section

![Haunter](haunter.png)

---

# Ghost-type Pokémon

The Ghost-type (ゴーストタイプ Gosuto taipu in Japanese) is one of the eighteen Pokémon elemental types.

```

## Center Layout

The center layout is used to create a single column layout with the content centered. The center layout is defined by the following JSON object:

```json
{ "layout" : "center" }
```

![Center Layout Example](https://res.cloudinary.com/formidablelabs/image/upload/c_scale,w_600/v1700171467/spectacle-assets/Screenshot_2023-11-16_at_3.46.39_PM.png)

```md

--- { "layout" : "center" }

![Gengar](gengar.png)

---

# Gengar

Gengar is a dark purple, bipedal Pokémon with a roundish body. It has red eyes and a wide mouth that is usually curled into a sinister grin. Multiple spikes cover its back, and it has large pointed ears. Its arms and legs are short with three digits on both its hands and feet. It also has a stubby tail.

```