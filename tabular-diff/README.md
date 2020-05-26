---
title: Tabular Diff Format
version: 0.8.0
author: Paul Fitzpatrick
created: 16 December 2011
updated: 27 May 2014
abstract: The Tabular Diff Format is a format for expressing the difference between two tables such that the difference is itself in tabular form.
sidebar: auto
---

# {{ $page.frontmatter.title }}

{{ $page.frontmatter.abstract }}

<MetadataTable />

## Language

<Language />

<style>
.highlighter td {
  empty-cells: show;
}
.highlighter tr {
  background-color: #fff;
}
.highlighter .add {
  background-color: #7fff7f;
}
.highlighter .remove {
  background-color: #ff7f7f;
}
.highlighter td.modify {
  background-color: #7f7fff;
}
.highlighter td.conflict {
  background-color: #f00;
}
.highlighter .spec {
  background-color: #aaa;
}
.highlighter .move {
  background-color: #ffa;
}
.highlighter .null {
  color: #888;
}
.highlighter table {
  border-collapse:collapse;
}
.highlighter td, .highlighter th {
  border: 1px solid #2D4068;
  padding: 3px 7px 2px;
}
.highlighter th, .highlighter .header {
  background-color: #aaf;
  font-weight: bold;
  padding-bottom: 4px;
  padding-top: 5px;
  text-align:left;
}
.highlighter tr:first-child td {
  border-top: 1px solid #2D4068;
  background-color: #fff;
}
.highlighter td:first-child {
  border-left: 1px solid #2D4068;
}
.highlighter table {
  margin: 0px auto;
  margin-bottom: 20px;
}
.highlighter tr {
 border-top: none;
}
.highlighter tr.desc td {
  border: none;
  font-style: italic;
  text-align:center;
}
.highlighter td.desc {
  border: none;
  background-color: #fff;
  font-style: italic;
}
.highlighter tr.blank td {
  border: none;
  background-color: #fff;
}
</style>

## Summary

The tabular diff format expresses the difference between two versions of a table.
Here's an example of a diff:

<div class="highlighter">
<table>
<tr><th>@@</th><th>bridge</th><th>designer</th><th>length</th></tr>
<tr><td></td><td>Brooklyn</td><td>J. A. Roebling</td><td>1595</td></tr>
<tr class="add"><td>+++</td><td>Manhattan</td><td>G. Lindenthal</td><td>1470</td></tr>
<tr class="modify"><td class="modify">-></td><td>Williamsburg</td><td class="modify">D. Duck->L. L. Buck</td><td>1600</td></tr>
<tr><td></td><td>Queensborough</td><td>Palmer & Hornbostel</td><td>1182</td></tr>
<tr><td>...</td><td>...</td><td>...</td><td>...</td></tr>
<tr><td></td><td>George Washington</td><td>O. H. Ammann</td><td>3500</td></tr>
<tr class="remove"><td>---</td><td>Spamspan</td><td>S. Spamington</td><td>10000 </td></tr>
</table>
</div>

As for text diffs, the format emphasizes significant changes.  Also like text diffs, the format is unambiguous without color, but readily enhanced with it.  Unlike text diffs, the format preserves the original tabular structure, allowing presentation with sensible visual alignment.

There is a reference implementation of a tool for generating and processing tabular diffs at https://github.com/paulfitz/daff.


## Scope

The tabular diff format can express the following kinds of changes in a table:

 -   Inserted or deleted rows.
 -   Inserted, deleted, or renamed columns.
 -   Modified cell values.

If the order of the rows or columns of the the table are meaningful, then the format can also express:

 -   Reordered rows or columns.

Changes in formatting and systematic transformation of data (such as capitalization) are not expressible.

## General structure

Assume we have two tables, called `LOCAL` and `REMOTE`. The diff summarizes the changes needed to modify `LOCAL` to match `REMOTE`.

The diff contains rows and columns from the tables being compared. As in regular text diffs, there is flexibility in what data is given and what is omitted.

 -   A column or row that is common to the tables being compared should appear at most once.
 -   Any column or row containing a modified cell should be included in the diff, and the modified cell should be represented using the procedure in [Expressing a modified cell value](#expressing-a-modified-cell-value).
 -   Columns or rows that are present in one table and not in the other should be included in the diff.
 -   Columns or rows that are unchanged and unneeded for context may be omitted, at the diff creator's discretion.
 -   Omitted blocks of rows or columns should be marked with a row/column full of `...` cells.

In addition, the diff contains the following special rows and columns:

 -   The *action* column. This is always present, and is the first column in the diff if columns are ordered. If columns are *not* ordered, it is the column named `__hilite_diff__`.
 -   A *header* row with column names. This row can be recognized since it will have the tag `@@` in the action column.
 -   A *schema* row that is needed when the column structure differs between tables. This row can be recognized since it will have the tag `!` in the action column.

Here's an example diff, where the tables being compared share the same three columns:

<div class="highlighter">
<table>
<tr class="desc"><td class="desc"></td><td>action&nbsp;column</td><td colspan="3">data from compared tables</td></tr>
<tr><td class="desc">header row</td><th>@@</th><th>bridge</th><th>designer</th><th>length</th></tr>
<tr><td class="desc"></td><td></td><td>Brooklyn</td><td>J. A. Roebling</td><td>1595</td></tr>
<tr class="add"><td class="desc"></td><td>+++</td><td>Manhattan</td><td>G. Lindenthal</td><td>1470</td></tr>
<tr class="modify"><td class="desc"></td><td class="modify">-></td><td>Williamsburg</td><td class="modify">D. Duck->L. L. Buck</td><td>1600</td></tr>
<tr><td class="desc"></td><td></td><td>Queensborough</td><td>Palmer & Hornbostel</td><td>1182</td></tr>
<tr><td class="desc">omitted rows</td><td>...</td><td>...</td><td>...</td><td>...</td></tr>
<tr><td class="desc"></td><td></td><td>George Washington</td><td>O. H. Ammann</td><td>3500</td></tr>
<tr class="remove"><td class="desc"></td><td>---</td><td>Spamspan</td><td>S. Spamington</td><td>10000 </td></tr>
</table>
</div>

The colors do not make up part of this specification, they are just syntax highlighting. The meaning of the various tags will become clear in later sections, for now we are just concerned with the structure of the diff. Here's an example where there is a difference in columns: `LOCAL` has a *length* column that is removed in `REMOTE`, `REMOTE` has an *opened* column that wasn't present in `LOCAL`, and the *designer* column in `LOCAL` is renamed as *lead designer* in `REMOTE`:

<div class="highlighter">
<table>
<tr class="desc"><td class="desc"></td><td>action&nbsp;column</td><td colspan="4">data from compared tables</td></tr>
<tr class="spec"><td class="desc">schema row</td><td>!</td><td></td><td class="add">+++</td><td>(designer)</td><td class="remove">---</td></tr>
<tr><td class="desc">header row</td><th>@@</th><th>bridge</th><th class="add">opened</th><th>lead designer</th><th class="remove">length</th></tr>
<tr><td class="desc" rowspan="8"></td><td>+</td><td>Brooklyn</td><td class="add">1883</td><td>J. A. Roebling</td><td class="remove">1595</td></tr>
<tr><td>+</td><td>Manhattan</td><td class="add">1909</td><td>G. Lindenthal</td><td class="remove">1470</td></tr>
<tr><td>+</td><td>Williamsburg</td><td class="add">1903</td><td>L. L. Buck</td><td class="remove">1600</td></tr>
<tr><td>+</td><td>Queensborough</td><td class="add">1909</td><td>Palmer & Hornbostel</td><td class="remove">1182</td></tr>
<tr><td>+</td><td>Triborough</td><td class="add">1936</td><td>O. H. Ammann</td><td class="remove">1380,383</td></tr>
<tr><td>+</td><td>Bronx Whitestone</td><td class="add">1939</td><td>O. H. Ammann</td><td class="remove">2300</td></tr>
<tr><td>+</td><td>Throgs Neck</td><td class="add">1961</td><td>O. H. Ammann</td><td class="remove">1800</td></tr>
<tr><td>+</td><td>George Washington</td><td class="add">1931</td><td>O. H. Ammann</td><td class="remove">3500</td></tr>
</table>
</div>

We see that a schema row is added above the header row to represent the changes in columns. With this general anatomy of a diff in mind, let's look at the details of how to interpret it.

:::tip
If writing a rule to "sniff" a file to see if it is a tabular diff, the `@@` tag is a handy tell-tale. But watch out for that schema row! Also, to allow for future evolution of this format, please try to be robust to a few extra rows or columns appearing before the `@@`.
:::

## Expressing inserted and deleted columns

An inserted column is expressed simply by including that column in the diff, and placing `+++` in the schema row above the corresponding column name in the header row. Similarly, a deleted column is expressed by including that column in the diff, and placing `---` in the schema row above the corresponding column name. As a special case, a renamed column is represented by simply placing its old name in parentheses in the schema row.

In our earlier example, `LOCAL` has the columns *bridge*, *designer*, and *length*, while `REMOTE` has the columns *bridge*, *opened*, and *lead designer* (*designer* renamed). So *opened* is inserted and *length* is deleted:

<div class="highlighter">
<table>
<tr class="desc"><td class="desc"></td><td>action<br />column</td><td colspan="4">data from compared tables</td></tr>
<tr class="spec"><td class="desc">schema row</td><td>!</td><td></td><td class="add">+++</td><td>(designer)</td><td class="remove">---</td></tr>
<tr><td class="desc">header row</td><th>@@</th><th>bridge</th><th class="add">opened</th><th>lead designer</th><th class="remove">length</th></tr>
<tr><td class="desc" rowspan="3"></td><td>+</td><td>Brooklyn</td><td class="add">1883</td><td>J. A. Roebling</td><td class="remove">1595</td></tr>
<tr><td>+</td><td>Manhattan</td><td class="add">1909</td><td>G. Lindenthal</td><td class="remove">1470</td></tr>
<tr><td>+</td><td>Williamsburg</td><td class="add">1903</td><td>L. L. Buck</td><td class="remove">1600</td></tr>
</table>
</div>

If we are dealing with a data store where columns are unordered, then likewise column order in the diff is irrelevant. Otherwise, the inserted and deleted rows should be placed in their appropriate order.

Any rows in the diff that are present only the `LOCAL` table will leave inserted columns blank. Similarly, any rows in the diff that are present only in the `REMOTE` table will leave deleted columns blank. Rows that are present in both tables will have values in all cells.

## Expressing inserted and deleted rows

An inserted row is expressed simply by placing `+++` in the action column, and placing cell values in the appropriate columns. If there are columns in the diff that are in `LOCAL` but not in `REMOTE`, these are left blank. Likewise, a deleted row is expressed by placing `---` in the action column, and its cell values in the appropriate columns. If there are columns in the diff that are in `REMOTE` but not in `LOCAL`, these are left blank. For example, suppose in `REMOTE` there is a row about a New Bridge that wasn't in `LOCAL`, and a row about a bridge called Spamspan has been dropped. Here is what the inserted and deleted rows would look like, lined up with the header row for reference:

<div class="highlighter">
<table>
<tr class="desc"><td class="desc"></td><td>action<br />column</td><td colspan="4"></td></tr>
<tr class="spec"><td class="desc">schema row</td><td>!</td><td></td><td class="add">+++</td><td>(designer)</td><td class="remove">---</td></tr>
<tr><td class="desc">header row</td><th>@@</th><th>bridge</th><th class="add">opened</th><th>lead designer</th><th class="remove">length</th></tr>
<tr class="blank"><td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td></tr>
<tr class="add"><td class="desc">inserted row</td><td>+++</td><td>New Bridge</td><td class="add">2050</td><td>Chimp N Zee</td><td class="remove">&nbsp;&nbsp;&nbsp;</td></tr>
<tr class="blank"><td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td></tr>
<tr class="remove"><td class="desc">deleted row</td><td>---</td><td>Spamspan</td><td></td><td>S. Spamington</td><td class="remove">10000</td></tr>
</table>
</div>

If the diff is on a database table where rows have no ordering, then we can just stick these rows together and we have our diff:

<div class="highlighter">
<table>
<tr class="desc"><td class="desc"></td><td>action<br />column</td><td colspan="4"></td></tr>
<tr class="spec"><td class="desc">schema row</td><td>!</td><td></td><td class="add">+++</td><td>(designer)</td><td class="remove">---</td></tr>
<tr><td class="desc">header row</td><th>@@</th><th>bridge</th><th class="add">opened</th><th>lead designer</th><th class="remove">length</th></tr>
<tr class="add"><td class="desc">inserted row</td><td>+++</td><td>New Bridge</td><td class="add">2050</td><td>Chimp N Zee</td><td class="remove">&nbsp;&nbsp;&nbsp;</td></tr>
<tr class="remove"><td class="desc">deleted row</td><td>---</td><td>Spamspan</td><td></td><td>S. Spamington</td><td class="remove">10000</td></tr>
</table>
</div>

If the diff is on a spreadsheet table or CSV file, we'd generally want to respect row ordering. In this case, we can add context rows around insertions so we know where to put them. Less importantly, since they are going away anyway, we can do the same for deletions:

<div class="highlighter">
<table>
<tr class="desc"><td class="desc"></td><td>action<br />column</td><td colspan="4"></td></tr>
<tr class="spec"><td class="desc">schema row</td><td>!</td><td></td><td class="add">+++</td><td>(designer)</td><td class="remove">---</td></tr>
<tr><td class="desc">header row</td><th>@@</th><th>bridge</th><th class="add">opened</th><th>lead designer</th><th class="remove">length</th></tr>
<tr><td class="desc">omitted rows</td><td>...</td><td>...</td><td>...</td><td>...</td><td>...</td></tr>
<tr><td class="desc">context row</td><td>+</td><td>Williamsburg</td><td class="add">1903</td><td>L. L. Buck</td><td class="remove">1600</td></tr>
<tr class="add"><td class="desc">inserted row</td><td>+++</td><td>New Bridge</td><td class="add">2050</td><td>Chimp N Zee</td><td class="remove">&nbsp;&nbsp;&nbsp;</td></tr>
<tr><td class="desc">context row</td><td>+</td><td>Queensborough</td><td class="add">1909</td><td>Palmer & Hornbostel</td><td class="remove">1182</td></tr>
<tr><td class="desc">omitted rows</td><td>...</td><td>...</td><td>...</td><td>...</td><td>...</td></tr>
<tr><td class="desc">context row</td><td>+</td><td>George Washington</td><td class="add">1931</td><td>O. H. Ammann</td><td class="remove">3500</td></tr>
<tr class="remove"><td class="desc">deleted row</td><td>---</td><td>Spamspan</td><td></td><td>S. Spamington</td><td class="remove">10000</td></tr>
</table>
</div>

The action column for a context row may contain a blank, or `:`, or `+`. The `:` tag signifies the context row was moved (and its location is now as in the `REMOTE` table). The `+` signifies that there are cells added on that row.

## Expressing a modified cell value

If a row contains a cell whose value is different in the compared tables, then that row should be shown in the diff, with a tag in the action column that ends in `->`. Then, the modified cell will be represented by converting the `LOCAL` and `REMOTE` values to text (we have yet to say how) and using the action tag as a separator. So for example here we change the last cell in a row from "Green" to "Blue":

<div class="highlighter">
<table>
<tr><td class="modify">-></td><td>Gnome</td><td>Home and Garden</td><td class="modify">Green->Blue</td></tr>
</table>
</div>

The tag must be preceded with as many extra `-` characters as are needed to avoid collision with any character sequence on that row. So here is another row with exactly one cell changed:

<div class="highlighter">
<table>
<tr><td class="modify">--></td><td>Console</td><td>Toddlers -> Teenagers</td><td class="modify">White-->Pale</td></tr>
</table>
</div>

When encoding a cell change as a string, we lose information about the type of the cell value. One distinction that may be important to retain is the difference between a NULL or empty cell, and the empty string. The tabular diff uses the following encoding:

 -   A NULL value, if available, represents itself.
 -   The encoded string `NULL` represents a NULL value.
 -   The encoded string `_NULL` represents the string "NULL".
 -   The encoded string `__NULL` represents the string "\_NULL".
 -   ...

The goal is that the diff can be safely converted to and from CSV by existing tools without changing its meaning. To that end:

 -   For matching (e.g. on context lines) blank cells in the diff (either the NULL value or an empty string) should be treated as ambiguous, and match *either* of NULL or an empty string if an exact match is not available.
 -   When using a diff as a patch, and inserting new cells, a blank cell in the diff (either the NULL value or an empty string) should be treated as ambiguous, and the "right" thing done given the column type. If either value could be inserted, then the blank string should be inserted (since the encoded string `NULL` is available to specifically identify the NULL value).

Note that if the diff is being expressed in a table that allows nested structure (e.g. a JSON representation), a list representation for modified cells might be used to avoid this issue. There is no specification for that at this time.

## Expressing a moved row

:::tip
This can be ignored for tables for which row order is meaningless, e.g. in typical relational databases.
:::

A row that have been moved in a table for which row order is meaningful is marked with a `:` tag in the action column and placed in the order it appears in the `REMOTE` table.

To avoid burdening human readers with too much arcana, tags are *not* combined when multiple kinds of actions apply to a row or column. So for example, a context row that was moved and had a cell added will *not* be tagged as `:+` or `+:` or such-like, but rather by `:`. Cell addition can be determined from the schema row. These weak tags are included as aids for highlighting to express the most significant thing to know about a row.

## Expressing a moved column

:::tip
This can be ignored for tables for which column order is meaningless.
:::

A column that have been moved in a table for which column order is meaningful is marked with a `:` tag in the schema row and placed in the order it appears in the `REMOTE` table.

If a diff that contains a `:` tag is used to patch a table for which column order is not meaningful, that tag should simply be ignored.


## Reference: action column tags

| Symbol | Meaning |
| --- | --- |
| ``@@`` | The header row, giving column names. |
| ``!`` | The schema row, given column differences. |
| ``+++`` | An inserted row (present in ``REMOTE``, not present in ``LOCAL``). |
| ``---`` | A deleted row (present in ``LOCAL``, not present in ``REMOTE``). |
| ``->`` | A row with at least one cell modified cell. ``-->``, ``--->``, ``---->`` etc. have the same meaning. |
| Blank | A blank string or NULL marks a row common to ``LOCAL`` and ``REMOTE``, given for context. |
| ``...`` | Declares that rows common to ``LOCAL`` and ``REMOTE`` are being skipped. |
| ``+`` | A row with at least one added cell. |
| ``:`` | A reordered row. |

## Reference: schema row tags

|Symbol | Meaning |
| --- | --- |
|   ``+++`` | An inserted column (present in ``REMOTE``, not present in ``LOCAL``). |
|   ``---`` | A deleted column (present in ``LOCAL``, not present in ``REMOTE``). |
|   ``(<NAME>)`` | A renamed column (the name in ``LOCAL`` is given in parenthesis, and the name in ``REMOTE`` will be in the header row). |
|   Blank | A blank string or NULL marks a column common to ``LOCAL`` and ``REMOTE``, given for context. |
|   ``...`` | Declares that columns common to ``LOCAL`` and ``REMOTE`` are being skipped. |
|   ``:`` | A reordered column. |
