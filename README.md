# Write content to file javascript action

This action writes the input content into the file mentioned in the path.

## Inputs

## `path`

**Required** Path of file (including filename and extension) to write on. Default `""`.

## `newFile`

**Required** If the file is not found in the path specified and if this field is set to true, it will create the file in the specified path. Default `true`.

## `content`

**Required** The content to write on to the file. Default `""`.

## `overwrite`

**Required** Select if the content should be overwritten or appended to the file. Default `"Overwrite"`.

## Outputs

## `content`

The content written into the file

## Example usage

```yaml
- name: Update GitHub Profile README
    uses: whozen/github-write-file@v1.0
    env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    with:
        path: "myFile.txt"
        newFile: true
        content: "Hello World!!!"
        overwrite: "Overwrite"
```