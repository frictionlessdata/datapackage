<template>
  <table class="frm-table">
    <tbody>
       <tr>
        <th> Author(s) </th>
        <td> {{ $page.frontmatter.author }} </td>
      </tr>
      <tr>
      <tr>
        <th> Created </th>
        <td> {{ $page.frontmatter.created }} </td>
      </tr>
      <tr>
      <tr>
        <th> Updated </th>
        <td> {{ $page.frontmatter.updated }} </td>
      </tr>
      <tr>
        <th> JSON Schema </th>
        <td><a :href= "'/schemas/' + $page.frontmatter.descriptor" >{{ $page.frontmatter.descriptor }} </a> </td>
      </tr>
      <tr>
        <th> Version </th>
        <td> {{ $page.frontmatter.version }} </td>
      </tr>
    </tbody>
  </table>
</template>
